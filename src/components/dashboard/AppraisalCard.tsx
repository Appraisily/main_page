import React from 'react';
import { format } from 'date-fns';
import { DollarSign, Clock, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AppraisalPost } from '@/lib/types/dashboard';
import { decodeHtmlEntities, truncateWords } from '@/lib/utils';

interface AppraisalCardProps {
  appraisal: AppraisalPost;
}

export default function AppraisalCard({ appraisal }: AppraisalCardProps) {
  console.log('🖼️ Appraisal Card Data:', {
    id: appraisal.id,
    title: appraisal.title,
    mainImage: appraisal.acf.main,
    link: appraisal.link,
    acfFields: Object.keys(appraisal.acf)
  });

  const title = decodeHtmlEntities(appraisal.title.rendered);
  const truncatedTitle = truncateWords(title, 10);

  return (
    <Card className="group">
      {/* Image Preview */}
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img
          src={appraisal.acf.main_url || appraisal.acf.main}
          alt={truncatedTitle}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            console.error('❌ Image load error:', {
              src: e.currentTarget.src,
              appraisalId: appraisal.id
            });
          }}
        />
      </div>

      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {format(new Date(appraisal.date), 'MMM d, yyyy')}
          </span>
        </div>
        <h3 className="font-semibold tracking-tight">
          {truncatedTitle}
        </h3>
      </CardHeader>

      <CardContent className="space-y-3">
        {appraisal.acf.value && (
          <div className="flex items-center text-muted-foreground">
            <DollarSign className="h-4 w-4 mr-2" />
            <span>Estimated Value: ${appraisal.acf.value}</span>
          </div>
        )}
        
        <div className="flex items-center text-muted-foreground">
          <Clock className="h-4 w-4 mr-2" />
          <span>{format(new Date(appraisal.date), 'MMMM d, yyyy')}</span>
        </div>
      </CardContent>

      <CardFooter>
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