import Signature from "~/components/Signature";

export default function SignatureGrid({ images }: { images: string[] }) {
  if (images.length === 0) {
    return <></>;
  } else {
    return (
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto justify-items-center">
          {images.map((image, index) => (
            <Signature 
              key={index + 1}
              image={image}
            />
          ))}
        </div>
      </div>
    );
  }
}
