@@ .. @@
       {/* Hero Section */}
-      <section
-        className={`relative py-20 ${
-          theme === "dark"
-            ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
-            : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
-        }`}
-      >
+      <section className="relative py-32 overflow-hidden">
+        <div
+          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
+          style={{
+            backgroundImage: "url('https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600')",
+          }}
+        >
+          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/80 to-blue-900/90"></div>
+        </div>
+
+        {/* Decorative elements */}
+        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"></div>
+        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-400/10 rounded-full blur-3xl"></div>
+
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center">
-            <h1
-              className={`text-5xl lg:text-6xl font-bold mb-6 ${
-                theme === "dark" ? "text-white" : "text-gray-900"
-              }`}
-            >
-              Get In
-              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
-                Touch
+            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8">
+              <Mail className="h-4 w-4 mr-2" />
+              We're here to help
+            </div>
+
+            <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-white leading-tight">
+              Get In
+              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
+                Touch
               </span>
             </h1>
-            <p
-              className={`text-xl mb-8 max-w-3xl mx-auto ${
-                theme === "dark" ? "text-gray-300" : "text-gray-600"
-              }`}
-            >
+
+            <p className="text-xl lg:text-2xl mb-12 max-w-4xl mx-auto text-blue-100 leading-relaxed">
               Have questions about BidHub? We're here to help! Reach out to our
               friendly support team and we'll get back to you as soon as
               possible.
             </p>
+
+            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
+              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
+                Start Live Chat
+              </button>
+              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
+                Browse FAQ
+              </button>
+            </div>
           </div>
         </div>
       </section>
 
       {/* Contact Info Cards */}
-      <section className="py-16">
+      <section className="py-16 -mt-16 relative z-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
-          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
+          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {contactInfo.map((info, index) => (
               <div
                 key={index}
-                className={`p-6 rounded-xl ${
+                className={`text-center p-8 rounded-2xl ${
                   theme === "dark" ? "bg-gray-800" : "bg-white"
-                } shadow-sm hover:shadow-md transition-shadow text-center`}
+                }/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border ${
+                  theme === "dark" ? "border-gray-700" : "border-gray-100"
+                }`}
               >
                 <div
-                  className={`inline-flex p-3 rounded-lg mb-4 ${
+                  className={`inline-flex p-4 rounded-xl mb-4 ${
                     theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                   } ${info.color}`}
                 >