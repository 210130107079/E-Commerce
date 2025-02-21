import Title from '../components/Title'

const PrivacyPolicy = () => {
  return (
    <div>
        <div className='text-center text-4xl pt-10 py-4'>
            <Title text1={'TERMS &'} text2={'CONDITION'}/>
        </div>
        <div className='flex flex-col md:flex-row text-sm mb-10 mt-10'>
            <div className='border border-black px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b className='text-2xl'>Information We Collect</b>
            <ul className="list-disc">
                <li className='text-gray-600 mt-2 text-base'>Personal details (name, email, phone number, address) when you register or make a purchase.</li>
                <li className='text-gray-600 mt-2 text-base'>Payment information processed securely by third-party payment gateways.</li>
                <li className='text-gray-600 mt-2 text-base'>Browsing data (cookies, IP address, device information) to enhance user experience.</li>
            </ul>
            </div>
        </div>

        <div className='flex flex-col md:flex-row text-sm mb-10 mt-10'>
            <div className='border border-black px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b className='text-2xl'>How We Use Your Information</b>
                <ul className="list-disc">
                    <li className='text-gray-600 mt-2 text-base'>To process and fulfill orders efficiently.</li>
                    <li className='text-gray-600 mt-2 text-base'>To improve our website, services, and customer experience.</li>
                    <li className='text-gray-600 mt-2 text-base'>To send promotional emails and offers (you can opt out anytime).</li>
                    <li className='text-gray-600 mt-2 text-base'>To comply with legal and security requirements.</li>
                </ul>
            </div>
        </div>

        <div className='flex flex-col md:flex-row text-sm mb-10 mt-10'>
            <div className='border border-black px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b className='text-2xl'>Data Sharing and Security</b>
                <ul className="list-disc">
                    <li className='text-gray-600 mt-2 text-base'>We do not sell or rent your personal data.</li>
                    <li className='text-gray-600 mt-2 text-base'>Third-party services (such as payment processors and delivery partners) may access necessary information.</li>
                    <li className='text-gray-600 mt-2 text-base'>We implement strict security measures to protect your data from unauthorized access.</li>
                </ul>
            </div>
        </div>

        <div className='flex flex-col md:flex-row text-sm mb-10 mt-10'>
            <div className='border border-black px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b className='text-2xl'>Cookies and Tracking Technologies</b>
                <ul className="list-disc">
                    <li className='text-gray-600 mt-2 text-base'>We use cookies to improve website functionality and personalize content.</li>
                    <li className='text-gray-600 mt-2 text-base'>You can adjust cookie preferences through your browser settings.</li>
                </ul>
            </div>
        </div>

        <div className='flex flex-col md:flex-row text-sm mb-10 mt-10'>
            <div className='border border-black px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b className='text-2xl'>Your Rights and Choices</b>
                <ul className="list-disc">
                    <li className='text-gray-600 mt-2 text-base'>You have the right to access, update, or delete your personal data.</li>
                    <li className='text-gray-600 mt-2 text-base'>You can opt out of marketing communications at any time.</li>
                    <li className='text-gray-600 mt-2 text-base'>Contact us at support@yourdomain.com for any privacy-related inquiries.</li>
                </ul>
            </div>
        </div>
    </div>
  )
}
export default PrivacyPolicy