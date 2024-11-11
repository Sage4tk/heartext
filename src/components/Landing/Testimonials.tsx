import { Star } from 'lucide-react'
import View from '../ui/View'

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      image: "/img/testimonial/sarahjohnson.jpg",
      quote: "HearText has revolutionized my content creation process. The text-to-speech feature is incredibly natural, and the speech-to-text accuracy is outstanding. It's saved me countless hours!",
      rating: 5
    },
    {
      name: "Michael Soney",
      role: "Podcast Host",
      image: "/img/testimonial/msoney.jpg",
      quote: "As a podcast host, I rely heavily on accurate transcriptions. HearText's speech-to-text feature has been a game-changer for creating show notes and improving accessibility for my listeners.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Language Learning App Developer",
      image: "/img/testimonial/emro.jpg",
      quote: "HearText is the best text-to-speech app! The voices are clear and natural, making it enjoyable to listen to. Highly recommended for anyone needing a great TTS solution!",
      rating: 4
    }
  ]

  return (

    <View>
    <section id="testimonials" className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col">
              <div className="flex items-center mb-4">
                <img

                  draggable={false}
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  className="rounded-full mr-4 select-none"
                  loading="lazy"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 flex-grow">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </View>
  )
}