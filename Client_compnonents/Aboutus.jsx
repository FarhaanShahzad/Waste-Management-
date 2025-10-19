import React from 'react'
import Footer from './footer'
import {
  LOGO_URL,
  dump_yard,
  dump_yard2,
  dumpyard3,
  forest1,
  recycle1,
  recycle2,
} from '../material'

const Aboutus = () => {
  return (
    <>
      {/* Fixed header with logo */}
      <div className="bg-green-700 text-white p-4 fixed top-0 left-0 w-full flex items-center gap-4 z-50 shadow-md">
        <img
          src={LOGO_URL}
          alt="app-logo"
          className="h-14 w-24 object-cover rounded-full border-2 border-white"
        />
        <div>
          <h2 className="text-xl font-semibold">Welcome to Waste Company</h2>
          <p className="text-sm">From Trash to Transformation</p>
        </div>
      </div>

      {/* Add top margin to avoid content hidden behind fixed header */}
      <div className="mt-28 max-w-5xl mx-auto px-4 space-y-12 text-gray-800">
        {/* Dumpyard Section */}
        <section className="space-y-6">
          <img src={dump_yard} alt="Dumpyard" className="w-full rounded-md shadow-md" />
          <p>
            Dumpyards, also known as open landfills, are sites where large amounts of
            unsegregated waste are discarded without proper treatment or management. These
            areas are extremely harmful to the environment and public health. As waste piles
            up, it releases toxic substances into the soil and groundwater, polluting nearby
            water sources. The decomposing organic waste produces methane, a potent greenhouse
            gas that contributes significantly to climate change. Additionally, dumpyards
            attract pests and stray animals, leading to the spread of diseases in nearby
            communities. The foul smell, smoke from burning waste, and leachate runoff further
            degrade air and soil quality. Without proper waste segregation and management,
            dumpyards become long-term environmental hazards that threaten ecosystems and
            human well-being.
          </p>
          <img src={dump_yard2} alt="Dumpyard Solution" className="w-full rounded-md shadow-md" />
          <p>
            The solution to the problems caused by dumpyards lies in adopting effective waste
            management practices that focus on reducing, reusing, and recycling waste. Instead
            of indiscriminately dumping garbage, waste should be properly segregated at the
            source into biodegradable, recyclable, and hazardous categories. Composting organic
            waste can reduce the volume sent to landfills and produce useful fertilizer.
            Recycling materials like plastics, metals, and paper helps conserve natural
            resources and minimizes pollution. Modern landfill technologies, such as engineered
            sanitary landfills with proper lining and leachate treatment systems, can prevent
            contamination of soil and water. Additionally, promoting public awareness and
            government regulations on waste disposal are essential to prevent illegal dumping.
            Together, these measures can transform harmful dumpyards into managed waste
            processing centers, protecting the environment and public health.
          </p>
        </section>

        {/* Recycling Section */}
        <section className="space-y-4">
          <div className="flex gap-6">
            <img src={recycle1} alt="Recycle" className="w-1/2 rounded-md shadow-md object-cover" />
            <img src={recycle2} alt="Recycle2" className="w-1/2 rounded-md shadow-md object-cover" />
          </div>
          <p>
            Segregation of waste plays a crucial role in the recycling process by ensuring that
            different types of waste are properly separated at the source. When biodegradable,
            recyclable, and hazardous wastes are sorted into distinct categories, it becomes
            much easier to process and recycle them efficiently. For example, clean paper,
            plastic, and metal can be directly sent to recycling facilities without contamination
            from food or wet waste. This not only improves the quality of recyclable materials
            but also reduces the cost and complexity of recycling. Moreover, proper segregation
            helps minimize the amount of waste that ends up in landfills or incinerators,
            thereby conserving natural resources, reducing pollution, and supporting a more
            sustainable environment.
          </p>
        </section>

        {/* Forest Section */}
        <section className="space-y-4">
          <img src={forest1} alt="Forest" className="w-full rounded-md shadow-md" />
          <p>
            Green forests are vital ecosystems that cover large areas of the Earth, providing a
            home to countless species of plants, animals, and microorganisms. They play a crucial
            role in maintaining the planet’s health by absorbing carbon dioxide and releasing
            oxygen, which helps regulate the climate and improve air quality. Forests also
            protect soil from erosion, maintain water cycles, and support biodiversity by
            offering shelter and food to wildlife. Beyond their environmental importance, green
            forests provide resources like timber, medicine, and recreational spaces for humans.
            Preserving and expanding these lush, green areas is essential for sustaining life on
            Earth and combating the effects of climate change.
          </p>
        </section>

        {/* Contact Section */}
        <section className="bg-gray-200 p-6 rounded-md max-w-2xl mx-auto space-y-6">
          <h2 className="text-lg font-semibold">Do you have any query?</h2>
          <div>
            <h3 className="font-semibold">Contact Us:</h3>
            <p>Kmc, Kolkata, West-Bengal, India</p>
            <p>+91-9865471230</p>
            <p>care@waste.com</p>
          </div>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <input
              type="email"
              placeholder="Email"
              className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
            />
            <button
              type="submit"
              className="bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
            >
              Send
            </button>
          </form>
        </section>
      </div>

      <Footer />
    </>
  )
}

export default Aboutus
