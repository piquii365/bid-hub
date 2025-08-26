@@ .. @@
   const handleSearch = (e: React.FormEvent) => {
     e.preventDefault();
     if (searchQuery.trim()) {
-      navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
+      // Check if user wants AI assistance
+      const query = searchQuery.trim().toLowerCase();
+      if (query.includes('help') || query.includes('ai') || query.includes('assistant') || query.startsWith('how')) {
+        // Open AI chat instead of search
+        // This would need to be passed down from Layout component
+        navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}&ai=true`);
+      } else {
+        navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
+      }
       setSearchQuery("");
     }
   };

export default handleSearch