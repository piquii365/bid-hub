@@ .. @@
   const handleSearch = (e: React.FormEvent) => {
     e.preventDefault();
     if (searchTerm.trim()) {
-      navigate(`/browse?search=${encodeURIComponent(searchTerm.trim())}`);
+      // Check if user wants AI assistance
+      const query = searchTerm.trim().toLowerCase();
+      if (query.includes('help') || query.includes('ai') || query.includes('assistant') || query.startsWith('how')) {
+        navigate(`/browse?search=${encodeURIComponent(searchTerm.trim())}&ai=true`);
+      } else {
+        navigate(`/browse?search=${encodeURIComponent(searchTerm.trim())}`);
+      }
       setSearchTerm("");
     }
   };
@@ .. @@
             {/* Quick Search */}
             <div className="max-w-2xl mx-auto mb-8">
-              <div className="relative">
+              <form onSubmit={handleSearch} className="relative">
                 <Search
                   className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 ${
                     theme === "dark" ? "text-gray-400" : "text-gray-500"
                   }`}
                 />
                 <input
                   type="text"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   placeholder="Search properties, cars, electronics..."
                   className={`w-full pl-12 pr-32 py-4 rounded-2xl border-2 text-lg transition-colors ${
                     theme === "dark"
                       ? "bg-gray-800/80 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                       : "bg-white/90 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                   } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                 />
-                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors">
+                <button 
+                  type="submit"
+                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors"
+                >
                   Search
                 </button>
-              </div>
+              </form>
             </div>