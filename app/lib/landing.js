import { gql } from "@apollo/client";

const GET_HERO = gql`
	query GetHero {
		getHero {
			hero {
				hero_media
				hero_header
				hero_sub_header
			}
		}
	}
`;
const GET_ABOUT = gql`
	query GetAbout {
		getAbout {
			about {
				about_image
				about_header
				about_sub_header
				about_second_sub_header
			}
		}
	}
`;
const GET_PARALLEL_SLIDE = gql`
	query GetParallelSlide {
		getParallelSlide {
			parallel_slide_display {
				slide_id
				parallelS_description
				parallelS_main_media {
					mobile
					tablet
					desktop
					alt
				}
				parallelS_secondary_media {
					mobile
					tablet
					desktop
					alt
				}
			}
		}
	}
`;
const GET_LANDING = gql`
	query GetLanding {
		getLanding {
			id
			hero {
				hero_media
				hero_header
				hero_sub_header
			}
			about {
				about_image
				about_header
				about_sub_header
				about_second_sub_header
			}
			parallel_slide_display {
				parallelS_description
				parallelS_main_media {
					mobile
					desktop
					tablet
					alt
				}
				parallelS_secondary_media {
					mobile
					tablet
					desktop
					alt
				}
			}
		}
	}
`;

export { GET_ABOUT, GET_HERO, GET_PARALLEL_SLIDE, GET_LANDING };
