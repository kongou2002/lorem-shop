/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ( {
        'gradient-random': `linear-gradient(to right, rgb(${ Math.floor( Math.random() * 256 ) }, ${ Math.floor( Math.random() * 256 ) }, ${ Math.floor( Math.random() * 256 ) }), rgb(${ Math.floor( Math.random() * 256 ) }, ${ Math.floor( Math.random() * 256 ) }, ${ Math.floor( Math.random() * 256 ) }))`,
      } ),
    },
  },
  plugins: [ require( "daisyui" ) ],
  daisyui: {
    themes: [ "dark", "light", ]
  },
}
