import React from 'react';
import { format } from 'date-fns';
import { DollarSign, Clock, ExternalLink, Info } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AppraisalPost } from '@/lib/types/dashboard';
import { decodeHtmlEntities, truncateWords } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AppraisalCardProps {
  appraisal: AppraisalPost;
}

export default function AppraisalCard({ appraisal }: AppraisalCardProps) {
  // Get the best available image URL
  const imageUrl = appraisal.main_image_url || 
                  appraisal.yoast_head_json?.og_image?.[0]?.url ||
                  appraisal.acf.main_url ||
                  appraisal.acf.main ||
                  '/placeholder-image.jpg';

  const title = decodeHtmlEntities(appraisal.title.rendered);
  const truncatedTitle = truncateWords(title, 8);

  // Format value with commas
  const formattedValue = appraisal.acf.value 
    ? Number(appraisal.acf.value).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
    : null;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 bg-white border-gray-100">
      {/* Image Preview */}
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img
          src={imageUrl}
          alt={truncatedTitle}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            console.error('[Appraisal Card] Image load error:', {
              id: appraisal.id,
              src: e.currentTarget.src
            });
            e.currentTarget.src = '/placeholder-image.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {format(new Date(appraisal.date), 'MMM d, yyyy')}
          </span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <h3 className="font-semibold tracking-tight text-lg line-clamp-2 group-hover:text-blue-600 transition-colors cursor-default">
                {truncatedTitle}
              </h3>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>

      <CardContent className="space-y-4">
        {formattedValue && (
          <div className="flex items-center text-gray-900 bg-gray-50 p-3 rounded-lg">
            <DollarSign className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
            <span className="font-medium truncate">
              Estimated Value: ${formattedValue}
            </span>
          </div>
        )}
        
        <div className="flex items-center text-gray-600">
          <Clock className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
          <span className="truncate">{format(new Date(appraisal.date), 'MMMM d, yyyy')}</span>
        </div>

        {(appraisal.acf.condition || appraisal.acf.age_text || appraisal.acf.style) && (
          <div className="flex items-start text-gray-600 bg-gray-50 p-3 rounded-lg">
            <Info className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-blue-600" />
            <div className="text-sm space-y-1.5 min-w-0 flex-1">
              {appraisal.acf.condition && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="flex items-center">
                        <span className="font-medium mr-2 flex-shrink-0">Condition:</span>
                        <span className="truncate">{appraisal.acf.condition}</span>
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{appraisal.acf.condition}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {appraisal.acf.age_text && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="flex items-center">
                        <span className="font-medium mr-2 flex-shrink-0">Age:</span>
                        <span className="truncate">{appraisal.acf.age_text}</span>
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{appraisal.acf.age_text}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {appraisal.acf.style && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="flex items-center">
                        <span className="font-medium mr-2 flex-shrink-0">Style:</span>
                        <span className="truncate">{appraisal.acf.style}</span>
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{appraisal.acf.style}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button 
          variant="default" 
          className="w-full bg-gray-900 hover:bg-gray-800 text-white transition-colors" 
          asChild
        >
          <a 
            href={appraisal.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-2"
          >
            View Details
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}