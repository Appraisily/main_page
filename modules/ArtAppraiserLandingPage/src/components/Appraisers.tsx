import React, { useState } from 'react';
import { Award, Star, Shield, X } from 'lucide-react';

function Appraisers() {
  const [popover, setPopover] = useState<{
    isOpen: boolean;
    content: string;
    position: { x: number; y: number };
  }>({
    isOpen: false,
    content: '',
    position: { x: 0, y: 0 }
  });

  // ... rest of the component code ...

  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}

export default Appraisers;