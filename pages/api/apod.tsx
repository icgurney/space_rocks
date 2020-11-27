import { NextApiRequest, NextApiResponse } from "next";

export const apod = (req: NextApiRequest, res: NextApiResponse) => {
  // const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.api_key}&date=${context.locale}`)
  // const go = await res.json()
  // return {
  //   props: {go}, // will be passed to the page component as props
  // }
  // try {
  //   res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.api_key}&date=${context.locale}`)
  //   res.status(200).json()
  // } catch(err) {
  //   res.status(500).json({ statusCode: 500, message: err.message })
  //   res.status(400).json({ statusCode: 400, message: err.message })
  // }
  // res.statusCode = 200
  // res.setHeader('Content-Type', 'application/json')
  // res.end(JSON.stringify({ name: 'John Doe' }))
  // res.status(200).json();
};
