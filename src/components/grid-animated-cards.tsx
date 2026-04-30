import Card from "@/components/card";

import CardAnimation01 from "@/components/card-animation-01";
import CardAnimation02 from "@/components/card-animation-02";
import CardAnimation03 from "@/components/card-animation-03";
import CardAnimation04 from "@/components/card-animation-04";

export default function GridAnimatedCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] md:auto-rows-[350px] gap-4 w-full mx-auto max-w-7xl">
      {/* Card 1: Context Management System (Wide) */}
      <Card
        className="md:col-span-2 md:row-span-1"
        title={<>Your <span className="gradient-text-both">Context Management System</span></>}
        description="All your agency’s context organized as a living knowledge system that every agent can access."
      >
        <img 
          src="/context.png" 
          className="absolute inset-0 w-full h-full object-cover object-top" 
          alt="Context System"
        />
      </Card>

      {/* Card 2: AI Agents (Small) */}
      <Card
        className="md:col-span-1 md:row-span-1"
        title={<>Your <span className="gradient-text-purple">AI Agents</span></>}
        description="Custom-trained to execute with you, not just assist."
      >
        <img 
          src="/Agents.png" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="AI Agents"
        />
      </Card>

      {/* Card 3: Workflows & Tools (Small) */}
      <Card
        className="md:col-span-1 md:row-span-1"
        title={<>Your <span className="gradient-text-orange">Workflows & Tools</span></>}
        description="We integrate your tools into a single operational flow."
      >
        <img 
          src="/workflows.jpg" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Workflows"
        />
      </Card>

      {/* Card 4: Command Center (Wide) */}
      <Card
        className="md:col-span-2 md:row-span-1"
        title={<>Your <span className="gradient-text-both">Command Center</span></>}
        description="Oversee all your agents, tasks, and deliverables in real-time."
      >
        <img 
          src="/command.png" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Command Center"
        />
      </Card>
    </div>
  );
}
