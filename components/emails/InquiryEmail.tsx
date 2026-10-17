import * as React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "react-email";
interface InquiryEmailProps {
  senderEmail: string;
  senderName: string;
  senderPhone: string;
  ownerName: string;
  message: string;
  propertyTitle: string;
  propertyPrice: string | number;
}
export const InquiryEmail = ({
  senderEmail,
  senderName,
  senderPhone,
  ownerName,
  message,
  propertyTitle,
  propertyPrice,
}: InquiryEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New Property Inquiry for {propertyTitle}</Preview>
      <Body style={{ backgroundColor: "#ffffff", fontFamily: "sans-serif" }}>
        <Container style={{ margin: "0 auto", padding: "20px 0 48px" }}>
          <Heading style={{ fontSize: "24px", letterSpacing: "-0.5px" }}>
            Dear {ownerName},
          </Heading>
          <Text style={{ fontSize: "16px", lineHeight: "26px" }}>
            You have received a new inquiry from a potential client regarding
            your property listing.
          </Text>
          <section
            style={{
              padding: "16px",
              backgroundColor: "#f4f4f5",
              borderRadius: "8px",
            }}
          >
            <Text style={{ margin: "0 0 8px", fontWeight: "bold" }}>
              Property: {propertyTitle}
            </Text>
            <Text style={{ margin: "0" }}>
              Price: ${Number(propertyPrice).toLocaleString()}
            </Text>
          </section>
          <section style={{ marginTop: "24px" }}>
            <Heading as="h3" style={{ fontSize: "18px" }}>
              Client Details:
            </Heading>
            <Text>
              <strong>Name:</strong> {senderName}
            </Text>
            <Text>
              <strong>Email:</strong> {senderEmail}
            </Text>
            <Text>
              <strong>Phone:</strong> {senderPhone}
            </Text>
          </section>
          <Hr style={{ borderColor: "#e6ebf1", margin: "20px 0" }} />
          <section>
            {" "}
            <Heading as="h3" style={{ fontSize: "18px" }}>
              Message:
            </Heading>
            <Text style={{ fontSize: "16px", lineHeight: "26px" }}>
              {message}
            </Text>
          </section>
        </Container>
      </Body>
    </Html>
  );
};
export default InquiryEmail;
