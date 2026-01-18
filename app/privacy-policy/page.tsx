import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Link from "next/link";

const PrivacyPolicyPage = () => {
  return (
        <div className="min-h-screen bg-white">
          <Header />
    <div className="max-w-5xl mx-auto w-full">
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-4 text-gray-600">Last Updated: 17th January 2026</p>

      <p className="mb-4">
        This Privacy Policy describes how Sanchaar EduTech Private Limited,
        operating under the brand name Gyan Sanchaar (“Company”, “we”, “our”,
        “us”), collects, uses, stores, shares, and protects information provided
        by users (“you”, “your”) who access or use the Gyan Sanchaar platform,
        including its website www.gyansanchaar.com, mobile applications, and
        related services (collectively, the “Platform”).
      </p>

      <p className="mb-6">
        By accessing or using the Platform, you consent to the collection and
        use of information in accordance with this Privacy Policy.
      </p>

      <h2 className="mb-4 text-2xl font-semibold">1. Scope of the Policy</h2>
      <p className="mb-4">
        This Privacy Policy applies to all users of Gyan Sanchaar, including
        but not limited to:
      </p>
      <ul className="mb-4 ml-6 list-disc">
        <li>Students and aspirants</li>
        <li>Parents or guardians</li>
        <li>Colleges, universities, and institutions</li>
        <li>Registered users and visitors</li>
        <li>Counselling and application service users</li>
      </ul>

      <h2 className="mb-4 text-2xl font-semibold">
        2. Information We Collect
      </h2>
      <h3 className="mb-3 text-xl font-semibold">
        2.1 Information Provided by You
      </h3>
      <p className="mb-4">
        We may collect personal and academic information including:
      </p>
      <ul className="mb-4 ml-6 list-disc">
        <li>Name, email address, mobile number</li>
        <li>Date of birth, gender, location</li>
        <li>Academic qualifications, exam details, ranks, category (if applicable)</li>
        <li>Course preferences and counselling requirements</li>
        <li>Information submitted through forms, applications, or enquiries</li>
      </ul>
      <p className="mb-4">
        Providing this information is voluntary; however, some services may not
        be available without it.
      </p>

      <h3 className="mb-3 text-xl font-semibold">
        2.2 Automatically Collected Information
      </h3>
      <p className="mb-4">
        When you access the Platform, we may automatically collect:
      </p>
      <ul className="mb-4 ml-6 list-disc">
        <li>IP address</li>
        <li>Browser type, device type, operating system</li>
        <li>Pages visited, clicks, session duration</li>
        <li>Referral source</li>
        <li>Cookies and similar tracking technologies</li>
      </ul>

      <h3 className="mb-3 text-xl font-semibold">
        2.3 Information from Third Parties
      </h3>
      <p className="mb-4">We may receive information from:</p>
      <ul className="mb-4 ml-6 list-disc">
        <li>Colleges or institutions you apply to</li>
        <li>Service providers and technology partners</li>
        <li>Analytics and advertising partners</li>
      </ul>
      <p className="mb-4">
        We do not store payment card details or banking credentials.
      </p>

      <h2 className="mb-4 text-2xl font-semibold">3. Use of Information</h2>
      <p className="mb-4">We use the collected information to:</p>
      <ul className="mb-4 ml-6 list-disc">
        <li>Provide access to educational content, tools, and services</li>
        <li>Facilitate counselling, applications, and admissions</li>
        <li>Share relevant data with colleges and institutions selected by you</li>
        <li>
          Communicate important updates via email, SMS, WhatsApp, or calls
        </li>
        <li>Verify phone numbers and send OTPs</li>
        <li>Improve platform functionality and user experience</li>
        <li>Conduct analytics, research, and reporting</li>
        <li>
          Carry out marketing and promotional activities (with opt-out options)
        </li>
        <li>Comply with legal and regulatory requirements</li>
      </ul>

      <h2 className="mb-4 text-2xl font-semibold">
        4. Cookies and Tracking Technologies
      </h2>
      <p className="mb-4">
        Gyan Sanchaar uses cookies, pixels, and similar technologies to:
      </p>
      <ul className="mb-4 ml-6 list-disc">
        <li>Maintain secure sessions</li>
        <li>Understand user behavior and preferences</li>
        <li>Improve performance and content relevance</li>
        <li>Measure advertising effectiveness</li>
      </ul>
      <p className="mb-4">
        You may control cookies through your browser settings. Disabling cookies
        may limit certain features of the Platform.
      </p>

      <h2 className="mb-4 text-2xl font-semibold">5. Sharing of Information</h2>
      <p className="mb-4">We do not sell personal information.</p>
      <p className="mb-4">Your data may be shared only:</p>
      <ul className="mb-4 ml-6 list-disc">
        <li>With colleges or institutions you choose to apply to</li>
        <li>With service providers under confidentiality obligations</li>
        <li>When required by law or government authorities</li>
        <li>To protect the rights, safety, or integrity of users and the Platform</li>
        <li>In case of merger, acquisition, or restructuring, subject to notice</li>
      </ul>

      <h2 className="mb-4 text-2xl font-semibold">
        6. Third-Party Links and Services
      </h2>
      <p className="mb-4">
        The Platform may contain links to third-party websites or services.
      </p>
      <p className="mb-4">
        We are not responsible for the privacy practices or content of such
        third parties. Users are encouraged to review their privacy policies
        separately.
      </p>

      <h2 className="mb-4 text-2xl font-semibold">7. Data Security</h2>
      <p className="mb-4">
        Sanchaar EduTech Private Limited adopts reasonable security practices
        including:
      </p>
      <ul className="mb-4 ml-6 list-disc">
        <li>Secure servers and encrypted communication</li>
        <li>Access control mechanisms</li>
        <li>Firewalls and monitoring systems</li>
      </ul>
      <p className="mb-4">
        While we strive to protect your information, no method of transmission
        over the internet is completely secure.
      </p>

      <h2 className="mb-4 text-2xl font-semibold">8. Data Retention</h2>
      <p className="mb-4">We retain personal data only as long as necessary to:</p>
      <ul className="mb-4 ml-6 list-disc">
        <li>Provide services</li>
        <li>Meet legal and regulatory obligations</li>
        <li>Resolve disputes and enforce agreements</li>
      </ul>
      <p className="mb-4">
        Users may request deletion of their account, subject to applicable laws.
      </p>

      <h2 className="mb-4 text-2xl font-semibold">
        9. User Rights and Choices
      </h2>
      <p className="mb-4">You have the right to:</p>
      <ul className="mb-4 ml-6 list-disc">
        <li>Access and update your personal information</li>
        <li>Withdraw consent for marketing communications</li>
        <li>Request deletion of your data</li>
        <li>Opt out of non-essential cookies</li>
      </ul>
      <p className="mb-4">
        Requests may be submitted using the contact details below.
      </p>

      <h2 className="mb-4 text-2xl font-semibold">10. Children’s Privacy</h2>
      <p className="mb-4">
        The Platform is intended for users aged 13 years and above.
      </p>
      <p className="mb-4">
        We do not knowingly collect personal information from children under 13
        years of age.
      </p>

      <h2 className="mb-4 text-2xl font-semibold">
        11. Changes to This Privacy Policy
      </h2>
      <p className="mb-4">
        We reserve the right to modify this Privacy Policy at any time.
      </p>
      <p className="mb-4">
        Any changes will be posted on this page with an updated date. Continued
        use of the Platform constitutes acceptance of the revised policy.
      </p>

      <h2 className="mb-4 text-2xl font-semibold">
        12. Grievance & Contact Information
      </h2>
      <p className="mb-4">
        In accordance with applicable laws, you may contact us for any
        privacy-related concerns:
      </p>
      <p className="mb-1">
        <strong>Sanchaar EduTech Private Limited</strong>
      </p>
      <p className="mb-1">(Operating Gyan Sanchaar)</p>
      <p className="mb-1">
        <strong>Email:</strong> support@gyansanchaar.com
      </p>
      <p className="mb-4">
        <strong>Website:</strong> <Link className="inline text-primary underline decoration-orange-500" href={"https://gyansanchaar.com"}>
        www.gyansanchaar.com
        </Link>
      </p>
    </div>
    </div>
    <Footer/>
    </div>
  );
};

export default PrivacyPolicyPage;
