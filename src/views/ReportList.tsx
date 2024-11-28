import React from "react";
import { useReportViewModel } from "../viewModels/ReportViewModel";
import { firestore } from "../utils/firebaseconfig";
import { SoundPlayer } from "../components/SoundPlayer";
import { AlertCircle, Trash2, CheckCircle } from "lucide-react";
import "../index.css";
type Props = {
  category: string;
};
export const ReportList: React.FC<Props> = ({ category }) => {
  const {
    reports,
    loading,
    error,
    commentText,
    setCommentText,
    handleRemoveSound,
    handleIgnoreComplaint,
  } = useReportViewModel(firestore, category);
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center space-x-2"
          role="alert"
        >
          <AlertCircle className="text-red-500" />
          <span>Error: {error}</span>
        </div>
      </div>
    );
  if (reports.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center space-x-2"
          role="alert"
        >
          <AlertCircle className="text-red-500" />
          <span>No reports found.</span>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-10 py-8">
      <h1 className="text-3xl font-bold text-blue-300 mb-6">
        Malicious Content Reports
      </h1>
      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-sky-950 shadow-md rounded-lg p-4 border border-sky-950 hover:shadow-lg transition-shadow"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-sky-200 font-bold">User ID</div>
                <div className=" text-sky-100 mt-2 font-medium">
                  {report.userId}
                </div>

                {report.soundData && (
                  <>
                    <div className="text-sm text-sky-200 font-bold mt-2">
                      Author ID
                    </div>
                    <div className="text-sky-100 mt-2 font-medium">
                      {report.soundData.authorId}
                    </div>

                    <div className="text-sm text-sky-200 font-bold mt-2">
                      Reason
                    </div>
                    <div className="text-sky-100 mt-2 font-medium">
                      {report.reason}
                    </div>

                    <div className="text-sm text-sky-200 font-bold mt-2">
                      Reported at
                    </div>
                    <div className="text-sky-100 mt-2 font-medium">
                      {report.timestamp?.toLocaleString()}
                    </div>

                    <div className="mt-4">
                      <label
                        htmlFor={`comment-${report.id}`}
                        className="block text-sm font-medium text-sky-100"
                      >
                        Reason:
                      </label>
                      <textarea
                        id={`comment-${report.id}`}
                        rows={3}
                        className="mt-1 p-2 bg-sky-100 border text-sky-900 block w-full rounded-md outline-none border-sky-50 ring-sky-50 focus:border-sky-500 focus:ring-sky-500  shadow-md sm:text-sm"
                        placeholder="Reason for decision...(optional)"
                        value={commentText[report.id] || ""}
                        onChange={(e) =>
                          setCommentText({
                            ...commentText,
                            [report.id]: e.target.value,
                          })
                        }
                      />
                    </div>
                  </>
                )}
              </div>

              {report.soundData && (
                <div className="flex flex-col justify-center items-center space-y-4">
                  <SoundPlayer soundData={report.soundData} />

                  <div className="flex space-x-4">
                    {report.status !== "soundRemoved" && (
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md flex items-center space-x-2"
                        onClick={() => handleRemoveSound(report.id!)}
                      >
                        <Trash2 className="w-5 h-5" />
                        <span>Remove Sound</span>
                      </button>
                    )}
                    {report.status !== "complaintIgnored" && (
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md flex items-center space-x-2"
                        onClick={() => handleIgnoreComplaint(report.id!)}
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>Ignore Complaint</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
