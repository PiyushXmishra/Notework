interface CardProps{
    src: string,
    title:string
}

export default function Image({src,title}:CardProps){
    
        return (
          <img 
            src={src} 
            alt={title}
          />
        );
      
}