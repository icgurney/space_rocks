import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { Transition } from "@headlessui/react";
import { apod } from "../api/apod";
import { CSSProperties } from "react";

export default function AstronomyPictureOfTheDay({ apod }: APODProps) {
  const router = useRouter();
  const { date, error } = router.query;
  const divStyle: CSSProperties = {
    position: "relative",
    paddingBottom: "56.25%" /* 16:9 */,
    height: "0",
    overflow: "hidden",
  };
  const iframeStyle: CSSProperties = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
  };

  return (
    // <div className="container mx-auto flex-col">
    <article className="prose prose-red lg:prose-xl mx-auto">
      <Transition
        appear={true}
        show={true}
        enter="transition-opacity duration-1500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <h1>{apod.title}</h1>
        {apod.media_type === "video" ? (
          <div style={divStyle}>
            <iframe
              style={iframeStyle}
              width="560"
              height="315"
              src={apod.url}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        ) : (
          <img
            className="mx-auto"
            src={apod.hdurl ? apod.hdurl : apod.url}
            alt={apod.title}
          />
        )}
      </Transition>
      <p>Date: {date}</p>
      <p>{apod.explanation}</p>
      <p>&copy; {apod.copyright}</p>
    </article>
    // </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const date = context.params?.date ? `&date=${context.params.date}` : ``;
  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.api_key}${date}`
  );
  const apod: APODProps = await res.json();
  console.log(res, apod);
  return {
    props: { apod }, // will be passed to the page component as props
  };
};

export interface APODProps {
  apod: {
    copyright: string;
    date: string;
    explanation: string;
    hdurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
  };
}
