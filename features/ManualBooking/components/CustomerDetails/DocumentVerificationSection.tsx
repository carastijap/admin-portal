"use client";

import { verificationDocuments } from "./data";
import { DocumentCard } from "./DocumentCard";

export function DocumentVerificationSection() {
  return (
    <>
      <h2 className="text-lg font-semibold">Document Verification</h2>
      <p className="text-sm text-muted-foreground -mt-4">
        Ensure all required customer documents are uploaded before proceeding.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {verificationDocuments.map((document) => (
          <DocumentCard
            key={document.title}
            title={document.title}
            placeholder={document.placeholder}
            href={document.href}
          />
        ))}
      </div>
    </>
  );
}
