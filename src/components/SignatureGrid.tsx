import Signature from "~/components/Signature";

// Sample data for signatures
const signatureData = [
  { name: "John Smith", title: "CEO", company: "Tech Solutions" },
  { name: "Sarah Johnson", title: "Marketing Director", company: "CreativeMinds" },
  { name: "Michael Wong", title: "Lead Developer", company: "CodeCrafters" },
  { name: "Emily Davis", title: "HR Manager", company: "People First" },
  { name: "Alex Rivera", title: "Product Manager", company: "Innovate Inc." },
  { name: "Taylor Kim", title: "Design Lead", company: "VisualWorks" },
  { name: "Jordan Lee", title: "Financial Analyst", company: "Capital Growth" },
  { name: "Jamie Wilson", title: "Operations Manager", company: "Efficient Systems" },
  { name: "Casey Morgan", title: "Sales Representative", company: "Revenue Boost" },
];

export default function SignatureGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
      {signatureData.map((sig, index) => (
        <Signature 
          key={index}
          name={sig.name}
          title={sig.title}
          company={sig.company}
        />
      ))}
    </div>
  );
}
