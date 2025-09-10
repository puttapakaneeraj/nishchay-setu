import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, language = 'english' } = await req.json();
    
    if (!message) {
      throw new Error('Message is required');
    }

    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    // System prompt based on language
    const systemPrompts = {
      english: "You are 'Dost' - a friendly career guidance counselor for Indian students. Help with career, education, and college choices. Be encouraging, practical, and culturally aware. Focus on government colleges, streams (Arts/Science/Commerce), and career paths in India.",
      hindi: "आप 'दोस्त' हैं - भारतीय छात्रों के लिए एक मित्रवत करियर गाइडेंस काउंसलर। करियर, शिक्षा, और कॉलेज विकल्पों में मदद करें। प्रोत्साहित करने वाले, व्यावहारिक, और सांस्कृतिक रूप से जागरूक रहें। सरकारी कॉलेजों, स्ट्रीम (कला/विज्ञान/वाणिज्य), और भारत में करियर पथों पर ध्यान दें।",
      telugu: "మీరు 'దోస్త్' - భారతీయ విద్యార్థులకు స్నేహపూర్వక కెరీర్ గైడెన్స్ కౌన్సెలర్. కెరీర్, విద్య, మరియు కాలేజీ ఎంపికలలో సహాయం చేయండి. ప్రోత్సాహకరంగా, ఆచరణాత్మకంగా, మరియు సాంస్కృతికంగా అవగాహనతో ఉండండి. ప్రభుత్వ కాలేజీలు, స్ట్రీమ్‌లు (కళలు/సైన్స్/వాణిజ్యం), మరియు భారతదేశంలో కెరీర్ మార్గాలపై దృష్టి పెట్టండి."
    };

    const systemPrompt = systemPrompts[language as keyof typeof systemPrompts] || systemPrompts.english;

    console.log('Sending request to OpenAI API...');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');
    
    const botResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      response: botResponse,
      language: language 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in advanced-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      fallbackResponse: language === 'hindi' 
        ? 'माफ करें, कुछ तकनीकी समस्या है। कृपया बाद में कोशिश करें।'
        : language === 'telugu' 
        ? 'క్షమించండి, కొంత సాంకేతిక సమస్య ఉంది. దయచేసి తర్వాత ప్రయత్నించండి.'
        : 'Sorry, there was a technical issue. Please try again later.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});