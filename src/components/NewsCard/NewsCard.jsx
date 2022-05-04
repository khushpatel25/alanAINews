import React,{useState,useEffect,createRef} from 'react'
import { Card,CardActions,CardActionArea,CardMedia,CardContent,Typography,Button } from '@material-ui/core'
import classNames from 'classnames'

import useStyles from './style'

const NewsCard = ({article:{publishedAt,url,urlToImage,title,description,source},i,activeArticle}) => {

    const classes = useStyles()
    const [elRefs,setElRefs] = useState([])
    const scrollToRef = (ref) => window.scroll(0,ref.current.offsetTop - 50)

    useEffect(()=>{
        setElRefs((refs) => Array(20).fill().map((_,j)=> refs[j] || createRef()))
    }
    ,[])

    useEffect(()=>{
        if(i===activeArticle && elRefs[activeArticle]){
            scrollToRef(elRefs[activeArticle])
        }
    }
    ,[i,activeArticle,elRefs])

  return (
        <Card ref={elRefs[i]} className={classNames(classes.card,activeArticle === i ? classes.activeCard : null)}>
        <CardActionArea href={url} target='_blank'>
            <CardMedia
                component='img'
                image={urlToImage || 'https://cdn.pixabay.com/photo/2013/07/12/19/16/newspaper-154444_960_720.png'}
                height='250'
            />
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary' component='h2'>{(new Date(publishedAt).toDateString())}</Typography>
                <Typography variant='body2' color='textSecondary' component='h2'>{source.name}</Typography>
            </div>
            <Typography variant='h5' gutterBottom className={classes.title}>{title}</Typography>
            <CardContent>
                <Typography variant='body2' component='p' color='textSecondary'>{description}</Typography>
            </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary'>Learn More</Button>
                <Typography variant='h5' color='textSecondary'>{i + 1}</Typography>
            </CardActions>
        </Card>
  )
}

export default NewsCard