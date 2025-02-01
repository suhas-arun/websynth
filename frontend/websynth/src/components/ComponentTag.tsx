import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ComponentTagProps {
  name: string;
  description: string;
  onClick: () => void;
}

const ComponentTag: React.FC<ComponentTagProps> = ({ name, description, onClick }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="p-4"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            {name}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ComponentTag;