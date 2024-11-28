import { useEffect, useState } from 'react';
import { collection, getDocs, Firestore, query, where, updateDoc, doc } from 'firebase/firestore';
import { Report } from '../models/Report';

export const useReportViewModel = (firestore: Firestore, category: string) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
  
  const fetchReports = async () => {
    try {
      setLoading(true);
      const reportsCollection = collection(firestore, 'reports');

      // Ensure category has a valid value
      const effectiveCategory = category ?? "all";
      
      // Build the query
      const reportsQuery =
        effectiveCategory === "all"
          ? reportsCollection
          : query(reportsCollection, where('status', '==', effectiveCategory));

      const snapshot = await getDocs(category == "all" ? reportsCollection : reportsQuery);
      
      const fetchedReports = snapshot.docs.map(doc => {
        const data = doc.data(); // Fetch document data
        const timestamp = data['timestamp']; // Replace 'yourTimestampField' with the actual field name
        
        // Convert Firebase Timestamp to a JS Date if it exists
        const readableDate = timestamp
          ? new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6).toLocaleString()
          : null;
      
        data['id'] = doc.id;
        data['timestamp'] = readableDate;
        return {
          ...data,
        } as Report;
      });
      
      setReports(fetchedReports);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch reports: ' + err);
      setLoading(false);
    }
  };
  const handleRemoveSound = async (reportId: string) => {
    try {
      await updateDoc(doc(firestore, "reports", reportId), {
        status: "soundRemoved",
        comment: commentText[reportId] || "",
      });
      fetchReports();
    } catch (err) {
      console.error("Error updating report:", err);
    }
  };
  
  const handleIgnoreComplaint = async (reportId: string) => {
    try {
      await updateDoc(doc(firestore, "reports", reportId), {
        status: "complaintIgnored",
        comment: commentText[reportId] || "",
      });
      fetchReports();
    } catch (err) {
      console.error("Error updating report:", err);
    }
  };
  useEffect(() => {
    fetchReports();
  }, [category]); 
  return { reports, loading, error, refetch: fetchReports, commentText, setCommentText, handleRemoveSound, handleIgnoreComplaint };
};