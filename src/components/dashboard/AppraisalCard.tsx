import React from 'react';
import { format } from 'date-fns';
import { DollarSign, Clock, ExternalLink, Info } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AppraisalPost } from '@/lib/types/dashboard';
import { decodeHtmlEntities, truncateWords } from '@/lib/utils';

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
  const truncatedTitle = truncateWords(title, 10);

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      {/* Image Preview */}
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img
          src={imageUrl}
          alt={truncatedTitle}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            console.error('[Appraisal Card] Image load error:', {
              id: appraisal.id,
              src: e.currentTarget.src
            });
            e.currentTarget.src = '/placeholder-image.jpg';
          }}
        />
      </div>

      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {format(new Date(appraisal.date), 'MMM d, yyyy')}
          </span>
        </div>
        <h3 className="font-semibold tracking-tight line-clamp-2">
          {truncatedTitle}
        </h3>
      </CardHeader>

      <CardContent className="space-y-3">
        {appraisal.acf.value && (
          <div className="flex items-center text-muted-foreground">
            <DollarSign className="h-4 w-4 mr-2 text-primary" />
            <span>Estimated Value: ${appraisal.acf.value}</span>
          </div>
        )}
        
        <div className="flex items-center text-muted-foreground">
          <Clock className="h-4 w-4 mr-2" />
          <span>{format(new Date(appraisal.date), 'MMMM d, yyyy')}</span>
        </div>

        {(appraisal.acf.condition || appraisal.acf.age_text || appraisal.acf.style) && (
          <div className="flex items-start text-muted-foreground">
            <Info className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
            <div className="text-sm space-y-1">
              {appraisal.acf.condition && (
                <p>Condition: {appraisal.acf.condition}</p>
              )}
              {appraisal.acf.age_text && (
                <p>Age: {appraisal.acf.age_text}</p>
              )}
              {appraisal.acf.style && (
                <p>Style: {appraisal.acf.style}</p>
              )}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="gap-2">
        <Button variant="outline" className="w-full" asChild>
          <a 
            href={appraisal.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2"
          >
            View Details
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}