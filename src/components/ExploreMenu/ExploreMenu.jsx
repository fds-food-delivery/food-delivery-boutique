import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useStore } from "../../store/useStore";
import { resolveImageUrl } from "../../utils/resolveImageUrl";

const ExploreMenu = ({ category, setCategory }) => {
	const { menu_list, url } = useStore();

	return (
		<Box id="explore-menu" sx={{ mb: 3 }}>
			<Stack
				id="menu"
				direction="row"
				spacing={3}
				sx={{ overflowX: "auto", pb: 1, px: 0.5 }}
			>
				{menu_list.map((item, index) => {
					const isActive = category === item.menu_name;
					return (
						<Stack
							key={item._id || index}
							alignItems="center"
							spacing={0.75}
							onClick={() =>
								setCategory((prev) => (prev === item.menu_name ? "All" : item.menu_name))
							}
							sx={{ cursor: "pointer", flexShrink: 0 }}
						>
							<Avatar
								src={resolveImageUrl(item.menu_image, `${url}/api/v1/categories/image`)}
								onError={(e) => {
									e.target.onerror = null;
									e.target.src = "https://placehold.co/300";
								}}
								sx={{
									width: 72,
									height: 72,
									border: isActive ? "3px solid" : "3px solid transparent",
									borderColor: isActive ? "primary.main" : "transparent",
									transition: "border-color 0.2s ease",
								}}
							/>
							<Typography
								variant="body2"
								fontWeight={isActive ? 700 : 500}
								color={isActive ? "primary" : "text.primary"}
								noWrap
							>
								{item.menu_name}
							</Typography>
						</Stack>
					);
				})}
			</Stack>
			<Divider sx={{ mt: 2 }} />
		</Box>
	);
};

export default ExploreMenu;
