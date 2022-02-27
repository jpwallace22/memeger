import React from "react";
import "../styles/terms.css";

import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/images/logo.svg";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

function Terms() {
  const navigate = useNavigate();

  return (
    <div className="terms">
      <main className="container">
        <div className="back">
          <HiOutlineArrowNarrowLeft onClick={() => navigate(-1)} />
          {/* Goes back to last page */}
        </div>
        <div className="logo">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="card">
          <h2>The legal stuff</h2>
          <p>
            <strong>Effective Feb 24, 2022</strong>
          </p>
          <p>
            Using our app to do anything other than access the links to this
            "Terms" page or accessing any page of our website other than our
            home page and this "Terms" page constitutes your consent to these
            terms of use and to our Privacy Policy. If you do not consent, do
            not use our website.
          </p>{" "}
          <p>
            Your use of our website to do anything beyond simply
            accessing/viewing it (that is, uploading, downloading, commenting,
            etc.), constitutes not merely your consent, but also your electronic
            signature, meaning that you are contractually bound by these terms
            and by our <Link to="/privacy">Privacy Policy</Link>.
          </p>{" "}
        </div>
        <div className="card">
          <h3>Our community rules</h3>{" "}
          <p>
            These Terms of Use are our contract with you. We also have community
            rules, developed thanks to input from the Memegerian community, that
            serve as rules for using Memeger publicly.
          </p>{" "}
        </div>
        <div className="card">
          <h3>Stuff not to do</h3>
          <p>
            If someone else might own the copyright to it, don't upload it.
            Don't upload gore, "hate speech" (i.e. demeaning race, gender, age,
            religious or sexual orientation, etc.), or material that is
            threatening, harassing, defamatory, or that encourages violence or
            crime. Don't upload illegal content such as child porn or
            nonconsensual ("revenge") porn. Don't hotlink to adult content or to
            file-sharing, gambling, torrent, warez, or Memeger rip-off sites.
            Don't impersonate someone else. Also, don't use Memeger to host
            image libraries you link to from elsewhere, content for your
            website, advertising, avatars, or anything else that turns us into
            your content delivery network. If you do – and we will be the judge
            – or if you do anything illegal, in addition to any other legal
            rights we may have, we will ban you along with the site you're
            hotlinking from, delete all your images, report you to the
            authorities if necessary, and prevent you from viewing any images
            hosted on Memeger.com. We mean it.
          </p>{" "}
        </div>
        <div className="card">
          <h3>Stuff to do, please</h3>{" "}
          <p>
            Please have tons of fun! That's what Memeger is all about. If
            something isn't fun -- if you see anything on our site that
            shouldn't be there because it violates our policies, is illegal
            (e.g. revenge porn or child porn), or for some other reason, please
            let us know by emailing us at abuse@memeger.com.
          </p>
        </div>
        <div className="card">
          <h3>About images you upload</h3>
          <p>
            You can upload images anonymously and share them online with only
            the people you choose to share them with. If you make them publicly
            available, they may be featured in the gallery. If you share an
            image publicly with Facebook, Twitter, Digg, Reddit, etc., then it
            may end up in the gallery.
          </p>{" "}
        </div>
        <div className="card">
          <h2>The Details</h2>
          <p>
            <strong>Version 3.4 02/24/2022</strong>
          </p>{" "}
          <h3>Intellectual Property</h3>{" "}
          <p>
            By uploading a file or other content or by making a comment, you
            represent and warrant to us that (1) doing so does not violate or
            infringe anyone else's rights; and (2) you created the file or other
            content you are uploading, or otherwise have sufficient intellectual
            property rights to upload the material consistent with these terms.
            With regard to any file or content you upload to the public portions
            of our site, you grant Memeger a non-exclusive, royalty-free,
            perpetual, irrevocable worldwide license (with sublicense and
            assignment rights) to use, to display online and in any present or
            future media, to create derivative works of, to allow downloads of,
            and/or distribute any such file or content. To the extent that you
            delete any such file or content from the public portions of our
            site, the license you grant to Memeger pursuant to the preceding
            sentence will automatically terminate, but will not be revoked with
            respect to any file or content Memeger has already copied and
            sublicensed or designated for sublicense. Also, of course, anything
            you post to a public portion of our site may be used by the public
            pursuant to the following paragraph even after you delete it.
          </p>
        </div>
        <div className="card">
          <h3>USE OF MEMEGER CONTENT</h3>{" "}
          <p>
            By downloading an image or copying other user-generated content
            (UGC) from Memeger, you agree that you do not claim any rights to
            it. The following conditions apply:
          </p>{" "}
          <p>
            You may use UGC for personal, non-commercial purposes. You may use
            UGC for anything that qualifies as fair use under copyright law, for
            example journalism (news, comment, criticism, etc.), but please
            include an attribute ("Memeger" or "courtesy of Memeger") next to
            where it is displayed. You may not use UGC for non-journalistic
            commercial purposes. Your use of UGC is at your own risk. MEMEGER
            MAKES NO WARRANTIES OF NON-INFRINGEMENT, and you will indemnify and
            hold Memeger harmless from any copyright infringement claims arising
            out of your use of the UGC. (See our general disclaimers below.) You
            may not copy or use any portions of our site that are not UGC except
            within the limits of fair use.
          </p>{" "}
        </div>
        <div className="card">
          <h3>
            NOTICES OF CLAIMED COPYRIGHT INFRINGEMENT (OR OTHER TYPES OF
            INFRINGEMENT)
          </h3>{" "}
          <p>
            If you see anything on our site that you believe infringes your
            copyright rights, you may notify our Digital Millennium Copyright
            Act ("DMCA") agent by sending the following information:
            Identification of the copyrighted work or works claimed to have been
            infringed. IMPORTANT:
          </p>{" "}
          <p>
            please include your copyright registration number. If your work is
            not yet registered, please include a copy of the application to
            register the work that you filed with the Copyright Office. A
            copyright infringement claim based on a U.S. work can only be filed
            if the work has been registered (http://www.copyright.gov/eco/).
            Registration currently takes about seven months. Identification of
            the material on our servers that is claimed to be infringing and
            that is to be removed, including the URL or other information to
            enable us to locate the material. A statement that you have a good
            faith belief that use of the material in the manner complained of is
            not authorized by you as copyright owner, or by your agent, or by
            law. A statement that the information in your notice is accurate,
            and under penalty of perjury, that you are the owner (or authorized
            to act on behalf of the owner) of the exclusive copyright right that
            is allegedly being infringed. Your physical or electronic signature,
            or of someone authorized to act on your behalf.
          </p>
        </div>{" "}
        <div className="card">
          <h3>Disclaimer of Warranties, Limitations of Remedies, Indemnity</h3>{" "}
          <p>
            Although of course we strive to make Memeger as dependable as
            possible, Memeger's services are provided on an AS IS – WITH ALL
            FAULTS basis. Your use of our service is entirely at your own risk.
            We do not guarantee the availability of our service at any given
            time, or the reliability of our service when it is running. We do
            not guarantee the integrity of, or the continued availability of,
            files on our servers. Whether we make backups, and if so, whether
            restoration of those backups will be available to you, is at our
            discretion. MEMEGER DISCLAIMS ALL WARRANTIES, EXPRESS AND IMPLIED,
            INCLUDING WITHOUT LIMITATION IMPLIED WARRANTIES OF FITNESS AND
            MERCHANTABILITY. NOTWITHSTANDING ANYTHING ELSE STATED IN THESE
            TERMS, AND IRRESPECTIVE OF WHETHER MEMEGER TAKES OR DOES NOT TAKE
            MEASURES TO REMOVE INAPPROPRIATE OR HARMFUL CONTENT FROM ITS SITE,
            MEMEGER HAS NO DUTY TO MONITOR ANY CONTENT ON ITS SITE. MEMEGER DOES
            NOT ASSUME RESPONSIBILITY FOR THE ACCURACY, APPROPRIATENESS, OR
            HARMLESSNESS OF ANY CONTENT APPEARING ON MEMEGER.COM THAT IS NOT
            PRODUCED BY MEMEGER, INCLUDING BUT NOT LIMITED TO USER CONTENT,
            ADVERTISING CONTENT, OR OTHERWISE.
          </p>{" "}
          <p>
            Your sole remedy for the loss of any services and/or of any images
            or other data you may have stored on Memeger's service is to
            discontinue your use of our service. MEMEGER WILL NOT BE LIABLE FOR
            ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
            PUNITIVE DAMAGES ARISING OUT OF YOUR USE OF, OR INABILITY TO USE,
            MEMEGER'S SERVICES, EVEN IF MEMEGER HAS BEEN ADVISED OF OR
            REASONABLY SHOULD HAVE KNOWN OF THE POSSIBILITY OF SUCH DAMAGES. NO
            CAUSE OF ACTION ARISING OUT OF YOUR USE OF MEMEGER'S SERVICES MAY BE
            BROUGHT MORE THAN ONE YEAR AFTER IT OCCURS.
          </p>{" "}
          <p>
            YOU WILL INDEMNIFY AND HOLD MEMEGER AND ALL OF ITS PERSONNEL
            HARMLESS FROM ALL LOSS, LIABILITY, CLAIMS, DAMAGES AND EXPENSES,
            INCLUDING REASONABLE ATTORNEY FEES, ARISING OUT OF OR RELATED TO
            YOUR VIOLATION OF THESE TERMS, YOUR INFRINGEMENT OF ANY THIRD
            PARTY'S RIGHTS, AND ANY HARM CAUSED TO ANY THIRD PARTY AS A RESULT
            OF YOUR UPLOADING OF FILES, COMMENTS, OR ANYTHING ELSE TO OUR
            SERVERS.
          </p>
        </div>
        <div className="card">
          <h3>Miscellaneous </h3>
          <p>
            "Memeger" or "we" refers to Memeger, Inc., a Delaware corporation,
            and its successors and assigns. "You" refers to any person who has
            consented to these terms or has become contractually bound to them,
            whether such person is identified or not at the time. These terms
            are governed by California law, excluding its conflicts of law
            principles, and if there is a lawsuit between you and Memeger,
            jurisdiction and venue will lie exclusively in the State where the
            defendant is located, if within the United States, or in Santa Clara
            County, California otherwise. If any part of these terms is invalid,
            the remaining provisions will be unaffected. These Terms of Use
            constitute the entire agreement among the parties relating to this
            subject matter, and they will continue to govern any issues that
            arise out of your use of Memeger's services even after you
            discontinue using them. We may revise these terms from time to time
            without notice. Whenever we do so, we will so indicate by changing
            the version date at the top. Any changes apply as of the time they
            are posted. Memeger is not meant for use by children under age 13;
            if your child is younger than 13 please allow him or her to use it
            only under your supervision.
          </p>{" "}
          <p>
            Parental control protections (such as computer hardware, software,
            or filtering services) are commercially available that may assist
            you in limiting access to material that is harmful to minors.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Terms;
