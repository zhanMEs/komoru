// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';

// export default function ActionAreaCard() {
//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardActionArea>
//         <CardMedia
//           component="img"
//           height="300"
//           image="3.png"
//           alt="step1"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             Matt Wei
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             KOMORU平台帶給我前所未有的體驗，下次假期一定會再來下訂，認識不同以往的人事物給我好大的改  變！
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>,

//         <Card sx={{ maxWidth: 345 }}>
//         <CardActionArea>
//           <CardMedia
//             component="img"
//             height="300"
//             image="3.png"
//             alt="step1"
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div">
//               Matt Wei
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Lizards are a widespread group of squamate reptiles, with over 6,000
//               species, ranging across all continents except Antarctica
//             </Typography>
//           </CardContent>
//         </CardActionArea>
//       </Card>,

//       <Card sx={{ maxWidth: 345 }}>
//       <CardActionArea>
//         <CardMedia
//           component="img"
//           height="300"
//           image="3.png"
//           alt="step1"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             Matt Wei
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Lizards are a widespread group of squamate reptiles, with over 6,000
//             species, ranging across all continents except Antarctica
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
    

    
//   );
// }

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blueGrey, grey, orange, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Aos from "aos";
import "aos/dist/aos.css";
import {useEffect} from 'react';


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    Aos.init({ duration: 3000
     });
  }, []);

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor:"#ED8C4E" }} aria-label="recipe">
            M
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="KOMORU 使我成長"
        subheader="July 14, 2022"
      />
      <CardMedia
        component="img"
        height="450"
        image="memberpic.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="outlined" color="text.secondary" fontSize="20px">
        KOMORU 擁有強大的會員中心功能
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" style={{color:'#ED8C4E'}}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>心得回饋:</Typography>
          {/* <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography> */}
          <Typography paragraph>
          ＫＯＭＯＲＵ 為全台最大的複合式訂房平台集結下訂房源、客製活動以及會員中心，為旅者打造前所未有的放假體驗。我們遂將休假與生活結合，創造一個經由住宿來體驗你不曾接觸的活動，期望旅客放假過後能找到新的興趣、甚至改變生活的型態。在 ＫＯＭＯＲＵ 的體驗不僅是休息歇腳等待下次啟程，而是讓你嚐過了一次鮮甜，便期待著下一道菜、下一次的變化！
          </Typography>
          {/* <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography> */}
        </CardContent>
      </Collapse>
    </Card>
  );
}