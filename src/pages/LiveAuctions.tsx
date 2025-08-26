@@ .. @@
       {/* Hero Section */}
-      <section className={`relative py-20`}>
-        <div className="absolute inset-0 bg-[url('/property-bidding.jpg')] bg-cover bg-center bg-no-repeat z-0"></div>
-        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/80 to-blue-900/90"></div>
-        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  z-10">
+      <section className="relative py-32 overflow-hidden">
+        <div
+          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
+          style={{
+            backgroundImage: "url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600')",
+          }}
+        >
+          <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 via-orange-900/80 to-red-900/90"></div>
+        </div>
+
+        {/* Decorative elements */}
+        <div className="absolute top-20 left-10 w-32 h-32 bg-red-400/10 rounded-full blur-3xl"></div>
+        <div className="absolute bottom-20 right-10 w-48 h-48 bg-orange-400/10 rounded-full blur-3xl"></div>
+
+        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
           <div className="text-center">
-            <div className="flex items-center justify-center space-x-2 mb-4">
-              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
-              <span
-                className={`text-sm font-medium ${
-                  theme === "dark" ? "text-red-400" : "text-red-600"
-                }`}
-              >
-                LIVE NOW
-              </span>
+            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8">
+              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
+              Live auctions happening now
             </div>
-            <h1
-              className={`text-5xl lg:text-6xl font-bold mb-6 ${
-                theme === "dark" ? "text-white" : "text-gray-900"
-              }`}
-            >
-              Live
-              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
-                Auctions
+
+            <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-white leading-tight">
+              Live
+              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400">
+                Auctions
               </span>
             </h1>
-            <p
-              className={`text-xl mb-8 max-w-3xl mx-auto ${
-                theme === "dark" ? "text-gray-300" : "text-white"
-              }`}
-            >
+
+            <p className="text-xl lg:text-2xl mb-12 max-w-4xl mx-auto text-blue-100 leading-relaxed">
               Experience the thrill of real-time bidding. Join live auctions
-              happening right now and compete with bidders from around the
-              world.
+              happening right now and compete with bidders from around the world
+              for amazing properties and unique items.
             </p>
+
+            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
+              <button className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
+                Join Live Auction
+              </button>
+              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
+                How It Works
+              </button>
+            </div>
           </div>
         </div>
       </section>
@@ .. @@
       {/* Stats Section */}
-      <section className="py-16">
+      <section className="py-16 -mt-16 relative z-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
-          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
+          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
             {stats.map((stat, index) => (
               <div
                 key={index}
-                className={`p-6 rounded-xl ${
+                className={`text-center p-8 rounded-2xl ${
                   theme === "dark" ? "bg-gray-800" : "bg-white"
-                } shadow-sm hover:shadow-md transition-shadow`}
+                }/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border ${
+                  theme === "dark" ? "border-gray-700" : "border-gray-100"
+                }`}
               >
                 <div
-                  className={`w-12 h-12 rounded-lg ${stat.bgColor} ${stat.color} flex items-center justify-center mb-4`}
+                  className={`inline-flex p-4 rounded-xl mb-4 ${stat.bgColor} ${stat.color}`}
                 >
                   {stat.icon}
                 </div>
@@ -158,7 +178,7 @@
                 <div
                   className={`text-sm ${
                     theme === "dark" ? "text-gray-400" : "text-gray-600"
-                  }`}
+                  } font-medium`}
                 >
                   {stat.label}
                 </div>