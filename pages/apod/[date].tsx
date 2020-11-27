import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { Transition } from "@headlessui/react";
import { apod } from "../api/apod";

export default function APOD({ apod }: APODProps) {
  const router = useRouter();
  const { date, error } = router.query;

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
        <img
          className="mx-auto"
          src={apod.hdurl ? apod.hdurl : apod.url}
          alt={apod.title}
        />
      </Transition>
      <p>Date: {date}</p>
      <label className="inline-flex items-center">
        <input type="radio" name="radio" value="1" checked />
        <span>Option 1</span>
      </label>
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
