import Signature from "~/components/Signature";

export default function SignatureGrid({ images }: { images: string[] }) {
  if (images.length === 0) {
    return <></>;
  } else {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full max-w-5xl">
        {images.map((sig, index) => (
          <Signature 
            key={index}
            image={sig}
          />
        ))}
      </div>
    );
  }
}
