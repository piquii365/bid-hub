@@ .. @@
 import React from 'react';
 import { Outlet } from 'react-router-dom';
 import Header from './Header';
 import Footer from './Footer';
+import AIChatBot from '../Chat/AIChatBot';
+import ChatToggle from '../Chat/ChatToggle';
 import { useApp } from '../../context/AppContext';

 export default function Layout() {
   const { theme } = useApp();
+  const [isChatOpen, setIsChatOpen] = React.useState(false);

   return (
     <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors`}>
       <Header />
       <main className="flex-1">
         <Outlet />
       </main>
       <Footer />
+      
+      {/* AI Chat Components */}
+      <AIChatBot isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
+      <ChatToggle isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
     </div>
   );
 }