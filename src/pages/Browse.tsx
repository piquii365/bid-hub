@@ .. @@
 import React, { useState, useMemo } from 'react';
-import { useSearchParams } from 'react-router-dom';
+import { useSearchParams, useLocation } from 'react-router-dom';
 import { Grid, List, SlidersHorizontal } from "lucide-react";
 import { useApp } from "../context/AppContext";
 import PropertyGrid from "../components/Properties/PropertyGrid";
 import PropertyFilters from "../components/Properties/PropertyFilters";

 const Browse: React.FC = () => {
   const { properties, theme } = useApp();
   const [searchParams] = useSearchParams();
+  const location = useLocation();
   const [filters, setFilters] = useState<any>({
     search: searchParams.get("search") || "",
   });
   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
   const [showFilters, setShowFilters] = useState(false);
   const [sortBy, setSortBy] = useState("newest");
+
+  // Check if AI assistance was requested
+  React.useEffect(() => {
+    const aiRequested = searchParams.get('ai');
+    if (aiRequested === 'true') {
+      // This would trigger opening the AI chat
+      // For now, we'll just show a message
+      console.log('AI assistance requested for search:', searchParams.get('search'));
+    }
+  }, [searchParams]);