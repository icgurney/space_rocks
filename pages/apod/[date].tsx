import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { apod } from "../api/apod";

export default function APOD({ apod }: APODProps) {
  const router = useRouter();
  const { date, error } = router.query;

  return (
    <div className="container mx-auto flex-col">
      <h1 className="text-4xl">{apod.title}</h1>
      <p className="text-lg">Date: {date}</p>
      <p className="">{apod.explanation}</p>
      <img
        className="mx-auto"
        src={apod.hdurl ? apod.hdurl : apod.url}
        alt={apod.title}
      />
      <p>&copy; {apod.copyright}</p>
    </div>
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
