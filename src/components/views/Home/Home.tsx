import HomeCategory from "./HomeCategory";
import HeroMain from "./HeroMain";
import HeroSlider from "./HeroSlider";
import useHome from "./useHome";
import Hero2 from "./Hero2";
import HomeProductNew from "./HomeProductNew";
import HomeGender from "./HomeGender";

const Home = () => {
    const {
        dataBanners,
        isLoadingBanners,

        dataCategories,
        isLoadingCategories,

        dataNewProducts,
        isLoadingNewProducts
    } = useHome();

  return (
    <>  
        <HeroMain />
        
        <HeroSlider dataBanners={dataBanners?.data} isLoading={isLoadingBanners} />


        <HomeCategory data={dataCategories?.data} isLoading={isLoadingCategories} />

        <Hero2 />

        <HomeProductNew data={dataNewProducts?.data} isLoading={isLoadingNewProducts} />

        <HomeGender />
    </>
  )
}

export default Home;