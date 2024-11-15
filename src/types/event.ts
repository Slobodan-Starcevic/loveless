export interface EventProps {
    id: string;
    collection: string;
    data: {
      title: string;
      description: string;
      location: string;
      date: string;
      ticketLink: string;
      banner: string;
      images: { image: string }[];
    };
  }
  