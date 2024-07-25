import React from "react";

function Footer() {
  return (
    <>
      <footer className="bg-gradient-to-r from-[#e9f8ff] to-[#f7f0fe] pt-7 lg:pt-20">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between md:pb-14 lg:pb-24">
            <div className="w-full lg:w-1/2">
              <div className="flex items-center text-2xl font-avertabold ">
                <img src="images/logo.png" alt="Logo" className="w-24" />
                Saath Studio
              </div>
              <h4 className="text-[10px]  mt-3">DISCLAIMER</h4>
              <p className="text-[10px]  mt-3 text-justify">
                Google: We are not affiliated, associated, authorized, endorsed
                by, or in any way officially connected with Google, or any of
                its subsidiaries or its affiliates.
              </p>
              <p className="text-[10px] mt-3 text-justify">
                Facebook This site is not a part of the Facebook website or
                Facebook INC. Additionally, this site is NOT endorsed by
                Facebook in ANY WAY. FACEBOOK is a trademark of Facebook INC.
              </p>
              <p className="text-[10px] text-justify">
                We are not affiliated, associated, authorized, endorsed by, or
                in any way officially connected with Google, or any of its
                subsidiaries or its affiliates. This site is not a part of the
                Facebook website or Facebook INC. Additionally, this site is NOT
                endorsed by Facebook in ANY WAY. FACEBOOK is a trademark of
                Facebook INC. In no way is FaceBook™ affiliated with
                Revoicer.com . Once you leave Facebook or their partner networks
                you are no longer a part of their terms of service. Every effort
                has been made to accurately represent the product(s) sold
                through this website and their potential. The special discounted
                launch offer on this page will be a fully supported in the
                future, and has our support guarantee for two years from
                purchase, after this special launch. Any claims made or examples
                given are believed to be accurate, however, should not be relied
                on in any way in making a decision whether or not to purchase.
                Any testimonials and examples used are exceptional results,
                don't apply to the average purchaser and are not intended to
                represent or guarantee that anyone will achieve the same or
                similar results. Each individual's success depends on his or her
                background, dedication, desire and motivation as well as other
                factors not always known and sometimes beyond control. There is
                no guarantee you will duplicate the results stated here. You
                recognise any business endeavour has inherent risk for loss of
                capital. Basically, we can't force you to take action, so
                therefore we cannot promise success. Disclaimer: each client
                testimonial that you see is based on what our clients tell us.
                We don't verify their financial statements, we take their word
                on it. Getting results in building a business is hard, and each
                of our clients works really hard to get results. We don't
                guarantee any results.
              </p>
            </div>
            <div className="w-full lg:w-1/2 pl-0 lg:pl-20 mt-10 lg:mt-0 text-xs md:text-base lg:text-lg">
              <div className="flex justify-between">
                <div className="">
                  <h3 className="text-[#00acc6] font-avertabold mb-5">
                    Helpful Links:
                  </h3>
                  <ul className="space-y-5">
                    <li>
                      <a
                        target="blank"
                        href="https://saathstudio.com/about-us"
                        className="text-[#000] hover:text-[#8b81eb] hover:underline"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                       target="blank"
                        href="https://saathstudio.com/privacy-policy"
                        className="text-[#000] hover:text-[#8b81eb] hover:underline"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                       target="blank"
                        href="https://saathstudio.com/terms-and-condition"
                        className="text-[#000] hover:text-[#8b81eb] hover:underline"
                      >
                        Terms &amp; Conditions
                      </a>
                    </li>
                    <li>
                      <a
                       target="blank"
                        href="https://saathstudio.com/cancellation"
                        className="text-[#000] hover:text-[#8b81eb] hover:underline"
                      >
                        Cancellation and Refund Policy
                      </a>
                    </li>
                    <li>
                      <a
                       target="blank"
                        href="https://saathstudio.com/system-requirements"
                        className="text-[#000] hover:text-[#8b81eb] hover:underline"
                      >
                        System Requirements
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="">
                  <h3 className="text-[#a854a5] font-avertabold mb-5">
                    Support
                  </h3>
                  <ul className="space-y-5">
                    <li>
                      <a
                       target="blank"
                        href="https://saathstudio.com/faq"
                        className="text-[#000] hover:text-[#8b81eb] hover:underline"
                      >
                        FAQs
                      </a>
                    </li>
                    <li>
                      <a
                       target="blank"
                        href="https://saathstudio.com/account-deletion"
                        className="text-[#000] hover:text-[#8b81eb] hover:underline"
                      >
                        Account Deletion Request
                      </a>
                    </li>
                    <li>
                      <a
                      target="blank"
                        href="https://saathstudio.com/contact"
                        className="text-[#000] hover:text-[#8b81eb] hover:underline"
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="text-base text-[#adb4ba] pb-5">
            Copyright @2024 saathstudio.com
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
