import { ArrowRight } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-3 cursor-pointer select-none">
      {/* Icon mark */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center shadow-md">
        <ArrowRight className="w-5 h-5 text-white" />
      </div>
    </div>
  );
};

export default Logo;
