'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { Button } from '@/components/ui/button';

import carousel1 from '@/assets/carousel1.jpeg';
import carousel2 from '@/assets/carousel2.jpeg';
import carousel3 from '@/assets/carousel3.jpeg';
import carousel4 from '@/assets/carousel4.jpeg';
import carousel5 from '@/assets/carousel5.jpeg';
import carousel6 from '@/assets/carousel6.jpeg';

const carouselData = [
  {
    id: 1,
    image: carousel1,
    title: 'Abstract Landscape',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto accusamus ratione nesciunt atque, dolores vel culpa debitis officia expedita unde?',
  },
  {
    id: 2,
    image: carousel2,
    title: 'City Lights',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto accusamus ratione nesciunt atque, dolores vel culpa debitis officia expedita unde?',
  },
  {
    id: 3,
    image: carousel3,
    title: 'Mystical Forest',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto accusamus ratione nesciunt atque, dolores vel culpa debitis officia expedita unde?',
  },
  {
    id: 4,
    image: carousel4,
    title: 'Space Station',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto accusamus ratione nesciunt atque, dolores vel culpa debitis officia expedita unde?',
  },
  {
    id: 5,
    image: carousel5,
    title: 'Beach Paradise',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto accusamus ratione nesciunt atque, dolores vel culpa debitis officia expedita unde?',
  },
  {
    id: 6,
    image: carousel6,
    title: 'Northern Lights',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto accusamus ratione nesciunt atque, dolores vel culpa debitis officia expedita unde?',
  },
];

const StackedCarousel = () => {
  return (
    <section className="min-h-screen bg-background flex justify-center items-center py-10">
      <div className="w-full max-w-7xl px-4 border-2 border-blue-500">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 2.5,
            slideShadows: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="swiper-container"
        >
          {carouselData.map((item) => (
            <SwiperSlide key={item.id} className="carousel-slide border-2 border-red-500">
              <div className="aspect-[9/16] w-[20rem] bg-card border-[0.2rem] border-border rounded-[0.7rem] border-b-[0.4rem] border-b-primary border-t-[0.4rem] border-t-primary overflow-hidden flex flex-col">
                {/* Top image */}
                <div className="relative w-full h-[55%]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded-b-[0.6rem]"
                    priority
                  />
                </div>

                {/* Bottom text content */}
                <div className="flex flex-col flex-1 items-center justify-center text-center p-6">
                  <h3 className="text-[1.7rem] font-medium mb-2 text-foreground">
                    {item.title}
                  </h3>
                  <p className="max-w-[18rem] text-[0.8rem] font-normal text-muted-foreground mb-4">
                    {item.description}
                  </p>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-primary text-[0.8rem] rounded-[0.5rem] px-4 py-2 cursor-pointer transition-all">
                    Read more
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Scoped Swiper styles */}
      <style jsx global>{`
        .swiper-container {
          width: 100%;
          padding: 50px 0;
        }
        .carousel-slide {
          width: 20rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .swiper-slide-shadow-left,
        .swiper-slide-shadow-right {
          background-image: none !important;
        }
      `}</style>
    </section>
  );
};

export default StackedCarousel;
