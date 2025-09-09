import { Search, Calendar } from "lucide-react";

const NoResults = ({ searchTerm }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center max-w-md w-full">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          {searchTerm ? (
            <Search className="w-10 h-10 text-purple-400" />
          ) : (
            <Calendar className="w-10 h-10 text-purple-400" />
          )}
        </div>

        <h3 className="text-xl font-bold text-white mb-3">
          {searchTerm ? "No Events Found" : "No Events Yet"}
        </h3>

        <p className="text-gray-400 mb-6">
          {searchTerm
            ? `We couldn't find any events matching "${searchTerm}". Try adjusting your search terms.`
            : "You haven't created any events yet. Start by creating your first event!"}
        </p>

        {searchTerm && (
          <div className="space-y-2 text-sm text-gray-500">
            <p>Suggestions:</p>
            <ul className="text-left space-y-1">
              <li>• Check your spelling</li>
              <li>• Try different keywords</li>
              <li>• Use more general terms</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoResults;
