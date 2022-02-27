import React from "react";
import "../styles/terms.css";

import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/images/logo.svg";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

function Privacy() {
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
          <h2>Your Privacy Rights</h2>
          <strong>Effective Feb 22, 2022</strong>
        </div>
        <div className="card">
          <h2>Information we collect and the purposes for which we use it</h2>
          <h3>Automatically collected information</h3>
          <p>
            Our servers automatically collect the following information
            regarding devices that access our site or app: device
            characteristics (including device ID for mobile devices), operating
            system, browser type, IP address, username from stored cookies if
            present, dates and times of each login, page and image viewing
            statistics, and incoming and outgoing links. We also log the
            metadata associated with any uploaded images. We use this
            automatically collected anonymous data to analyze how our site and
            app are used so as to keep them optimized, to determine the
            popularity and usefulness of various features, to maintain the
            integrity of user accounts so that each user can see his or her
            posts and the upvotes, downvotes, and comments to them, and to
            enable users with usernames to access their posts, and membership
            information.
          </p>
          <p>
            None of this information is “personal information” – that is, data
            we could use to identify a specific person. We also provide
            automatically collected anonymous data to third party advertisers
            and analytics companies to supplement the tracking information
            described below, but we contractually prohibit such third parties
            from combining such anonymous data with other data they may have in
            a way that could enable the identification of individuals. We also
            use such data to enable us to comply with copyright law, with 18 USC
            §2258A (illegal content), and to respond to lawful requests by
            public authorities, including national security, courts, and law
            enforcement.
          </p>
        </div>
        <div className="card">
          <h3>Interactively collected information</h3>
          <p>
            In addition to the automatically collected anonymous data described
            above, we may place information on your device and then retrieve it
            later: we may use cookies, web beacons, or other anonymous tracking
            information to improve our server's interaction with your device. We
            also partner with third party advertisers who may (themselves or
            through their partners) place and/or recognize cookies on your
            device that collect data about which pages and ads are viewed while
            our app or site is being used. Advertiser cookies enable customized
            ads that are selected for display on your device based on the
            anonymous information collected. No personal data is on, connected
            to, or derivable from, these cookies. If you block or disable
            cookies and other tracking technologies, instead of getting
            customized ads you will see non-customized (generic) ads. Although
            our servers currently don't respond to "do-not-track" requests, you
            can block tracking in other ways. If you would like more information
            about this practice and to know your choices about not having this
            information used by these companies for interest based advertising,
            please visit{" "}
            <a href="http://www.aboutads.info/choices/">
              http://www.aboutads.info/choices/
            </a>{" "}
            or see the section below, “Accessing, correcting, and limiting use
            of your data”. Memeger participates in the Digital Advertising
            Alliance's (DAA) Self-Regulatory Program for Online Behavioral
            Advertising. For more information please visit{" "}
            <a href="http://www.aboutads.info.">http://www.aboutads.info.</a>
          </p>
        </div>
        <div className="card">
          <h3>Information you choose to give us</h3>
          <p>
            When you sign in with a username, we handle it in the same way as an
            automatically collected username except that if you don’t allow
            cookies, you have to enter your username each time you log in. A
            username is, by nature, publicly posted information. On occasion we
            may run a contest or other type of promotion, and to enable us to
            award prizes to the winners as well as to comply with the applicable
            laws, we collect real names and contact information – so if you win
            a contest, we’ll ask for that information and we’ll use it only for
            those two specific purposes.
          </p>
          <p>
            We collect whatever personal data about you that you choose to give
            us, such as a contact email address (which we do not make public)
            and profile information. We do not require you to use an account to
            upload images. If you open an account you do not have to provide any
            personal information except your cell phone number, which we don't
            retain; we use it once to send you a code. (See below.) If you are
            located in the EEA and wish to open an account, do not use your real
            name – choose a username and email address that reveal nothing about
            your identity. If you give us an email address, we’ll probably send
            you promotional messages once in a while; we’ll try to make them fun
            and interesting but of course you’ll be able to opt out at any time.
            We may work with outside companies to deliver targeted advertising
            to you while ensuring that no personal information about you is ever
            used; for example, we may generate a one-way hash from the email
            address you provide and provide only the hash to the outside
            companies, who track only the hash. A hash can never be reversed to
            reveal your email address or any other personal information; the
            process is explained below.
          </p>
        </div>
        <div className="card">
          <h3>Information you post</h3>{" "}
          <p>
            Memeger does not “collect” the stuff you post: images, comments,
            messages, etc., and – with respect to persons in the EEA – does not
            “process” or determine any purposes for processing of any
            information that you manifestly make public. In particular, every
            image uploaded to Memeger is public – whether uploaded directly
            without going through a user account, or uploaded via a user account
            – and has its own URL. No matter what your privacy settings are,
            every image can always be accessed and viewed by anyone who types in
            that exact URL. No image uploaded to Memeger is ever completely
            hidden from public view. This is mainly to ensure that Memeger,
            which allows anonymous postings, will not be used as a platform for
            illegality. So too for messaging: Memeger allows users to send
            messages to one another both indirectly (via comments to posts) and
            directly (via chat). Memeger's messaging functionality is not
            intended to be a secure messaging platform; it's just for fun. To
            ensure that Memeger's messaging platform is not used as a platform
            for illegality, all messages are public. No messages are ever
            completely hidden from public view. We may monitor user messaging.
          </p>{" "}
        </div>
        <div className="card">
          <h3>Post / Image Privacy</h3>
          <p>
            Uploading a New Post creates a “post” that can be shared to the
            community. The individual images inside the post are referred to as
            “images.” Although nothing you post to Memeger is completely hidden
            from public view or entirely private, with that understanding you
            can set the privacy level of posts. Hidden: Posts will be hidden by
            default. They are not searchable within Memeger, and will not appear
            in Memeger’s public gallery or public profile, but each one will
            still be accessible by going to the post’s URL. They cannot receive
            comments or earn points. Public: Posts will be publicly viewable and
            shared with the community. Public posts shared with the community
            will allow comments, sharing, and voting, and appear in a user’s
            profile.
          </p>{" "}
        </div>
        <div className="card">
          <h3>“Favorite Folders” Privacy</h3>{" "}
          <p>
            You can add favorited posts to folders that you create. Individual
            public posts that you favorite are always visible from the “All
            Favorites” page in your user profile and cannot be hidden, even
            those within folders. Favorited hidden posts will not appear
            publicly in your favorites. These settings for favorites cannot be
            changed, but the visibility of folders can be toggled to public or
            private. Public: Folders are visible to the public community on your
            public profile. Private: Private folders are kept hidden from your
            public profile.
          </p>
        </div>
        <div className="card">
          <h3>Accessing, correcting, and limiting use of your data</h3>{" "}
          <p>
            Because we don’t collect information about the identity of our users
            and don’t receive any information from third parties enabling us to
            identify our users, we have no means of knowing, or providing you
            with information about, whatever anonymous data about you we might
            have on our servers – unless you have a username. If you have a
            username, you may log in and access your data, correct whatever
            information you deem to be incorrect, opt out of information sharing
            with our advertisers, or delete your account. For legal reasons we
            may retain backup and/or archival copies of information prior to
            your corrections, amendments, or deletions.
          </p>{" "}
        </div>
        <div className="card">
          <h3>Data Protection</h3>{" "}
          <p>
            We take every reasonable precaution to protect the data on our
            servers from loss, misuse, unauthorized access, disclosure,
            alteration, or destruction, taking into account the risk level and
            the nature of the data. You are responsible for taking every
            reasonable precaution on your end to protect any unauthorized person
            from accessing your Memeger account.
          </p>
        </div>
        <div className="card">
          <h3>GDPR</h3>
          <p>
            Memeger does not collect “personal data” about, or monitor behavior
            of, “data subjects” as those terms are defined in GDPR Art.4(1), nor
            do we “target” individuals in the EEU. Regarding the latter, see
            Guidelines 3/2018 on the territorial scope of the GDPR (Article 3),
            Ver. 2.1 (07 Jan 2020). To contact us regarding privacy issues, you
            can email us at privacy@memeger.com
          </p>
        </div>
        <div className="card">
          <h3>Dispute resolution</h3>
          <p>
            These terms are governed by California law, excluding its conflicts
            of law principles, and if there is a lawsuit between a user and
            Memeger, jurisdiction and venue will lie exclusively in the State
            where the defendant is located, if within the United States, or in
            Santa Clara County, California otherwise.
          </p>{" "}
        </div>
        <div className="card">
          <h3>Changes to this Privacy Policy</h3>{" "}
          <p>
            We may revise our privacy policy from time to time by posting the
            changes here. You can determine the date of the most recent changes
            by looking at the “effective date” at the top. Print Memeger's
            Privacy Policy
          </p>
        </div>
      </main>
    </div>
  );
}

export default Privacy;
