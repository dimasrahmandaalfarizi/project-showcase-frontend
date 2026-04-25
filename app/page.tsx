'use client';

import CanvasLoader from "./components/common/CanvasLoader";
import ScrollWrapper from "./components/common/ScrollWrapper";
import Experience from "./components/experience";
import Footer from "./components/footer";
import Hero from "./components/hero";
import AiChatOverlay from "./components/chat/AiChatOverlay";

const Home = () => {
  return (
    <div className="relative h-[100dvh]">
      <CanvasLoader>
        <ScrollWrapper>
          <Hero/>
          <Experience/>
          <Footer/>
        </ScrollWrapper>
      </CanvasLoader>
      {/* AiChatOverlay is HTML/DOM — must live OUTSIDE the WebGL canvas */}
      <AiChatOverlay />
    </div>
  );
};
export default Home;
