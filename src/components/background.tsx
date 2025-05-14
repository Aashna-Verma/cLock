import gradient from '@/assets/gradient.webp';
import { useEffect } from 'react';
import '@/lib/grained.js';

function Background() {

  useEffect(() => {
    window.grained('#background', {
      "animate": false,
      "grainOpacity": 0.7,
      "grainSpeed": 1
    });
  });

  return (
    <div className="fixed inset-0 -z-50 w-full h-full">
      <div
        id="background"
        className="w-full h-full before:mix-blend-soft-light"
      >
        <img
          id="gradient"
          src={gradient}
          alt="background gradient"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
}

export default Background;