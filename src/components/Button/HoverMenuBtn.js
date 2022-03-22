import * as React from 'react'
import { useTheme, makeStyles, styled ,lighten,darken} from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import HoverMenu from 'material-ui-popup-state/HoverMenu'
import MenuItem from '@material-ui/core/MenuItem'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Button from '@material-ui/core/Button'
import {
  usePopupState,
  bindHover,
  bindFocus,
  bindMenu,
} from 'material-ui-popup-state/hooks'
import { grey} from '@material-ui/core/colors'
import { Route, useRouteMatch } from "react-router-dom";

const useCascadingMenuStyles = makeStyles((theme) => ({
  submenu: {
    marginTop: theme.spacing(-1),
  },
  title: {
    flexGrow: 1,
    color:grey[700],
    width:150,
    // marginLeft:4,
    // marginRight:4,
    // "&:hover": {
    //   backgroundColor: theme.customization.primaryColor[50],
    // }
},
  moreArrow: {
    marginRight: theme.spacing(-1),
  },
  btnNav:{
    textTransform: 'none',
  
},

}))

const CascadingContext = React.createContext({
  parentPopupState: null,
  rootPopupState: null,
})

function CascadingMenuItem({ onClick,title, id ,...props }) {
  const classes = useCascadingMenuStyles()
  let { path } = useRouteMatch();
  const { rootPopupState } = React.useContext(CascadingContext)
  if (!rootPopupState) throw new Error('must be used inside a CascadingMenu')
  const handleClick = React.useCallback(
    (event) => {
      rootPopupState.close(event)
        props.handleClickItem(title)
        
    },
    [rootPopupState, onClick]
  )

  return <MenuItem button {...props} onClick={handleClick} className={classes.title} 
    /* SỬA PATH NÈEEEEEE */
    component={Link} to={`${path}/products/${id}`} 
   />
}

function CascadingSubmenu({ onClick,title,id, popupId, ...props }) {
  let { url } = useRouteMatch();
  const classes = useCascadingMenuStyles()
  const { parentPopupState } = React.useContext(CascadingContext)
  const popupState = usePopupState({
    popupId,
    variant: 'popover',
    parentPopupState,
  })

  const { rootPopupState } = React.useContext(CascadingContext)
  if (!rootPopupState) throw new Error('must be used inside a CascadingMenu')
  const handleClick = React.useCallback(
    (event) => {
        rootPopupState.close(event)
 
        props.handleClickItem(title)
       
    },
    [rootPopupState, onClick]
  )

  return (
    <React.Fragment>
      <MenuItem {...bindHover(popupState)} {...bindFocus(popupState)} className={classes.title} onClick={handleClick} 
        /* SỬA PATH NÈEEEEEE */
        component={Link} to={`${url}/category/${id}`}
      >
        <span className={classes.title}>{title}</span>
        <ChevronRight className={classes.moreArrow} fontSize="small" />
      </MenuItem>
      
      <CascadingMenu
        {...props}
        classes={{ ...props.classes, paper: classes.submenu }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        popupState={popupState}
        style={{margin:2}}
      />
    </React.Fragment>
  )
}

function CascadingMenu({ popupState, ...props }) {
  const { rootPopupState } = React.useContext(CascadingContext)
  const context = React.useMemo(
    () => ({
      rootPopupState: rootPopupState || popupState,
      parentPopupState: popupState,
    }),
    [rootPopupState, popupState]
  )

  return (
    <CascadingContext.Provider value={context} >
      <HoverMenu {...props} {...bindMenu(popupState)} />
    </CascadingContext.Provider>
  )
}
const HoverMenuBtn = (props) => {
  const {handleClickItem,category,textColor,textSize,textBold} = props;
  let { url } = useRouteMatch();
  const classes = useCascadingMenuStyles();
  const popupState = usePopupState({
    popupId: 'demoMenu',
    variant: 'popover',
  })
  const renderTree = (nodes) => {
        if(nodes.children){
           return(
            <CascadingSubmenu 
         
            popupId={nodes.uuid} 
            id={nodes.id}
            title={nodes.name} 
            handleClickItem={handleClickItem}
         >
           {
           nodes.children.length ? nodes.children.map((node) => renderTree(node)) : 
                <CascadingMenuItem 
               
                id={nodes.id}
                title={nodes.name} 
                handleClickItem={handleClickItem}
                >
                    {nodes.name}
                </CascadingMenuItem>
           }
        </CascadingSubmenu>
           )
        }else{
            return(
                <CascadingMenuItem 
                id={nodes.id}
                title={nodes.title} 
                handleClickItem={handleClickItem}
                >
                    {nodes.title}
                </CascadingMenuItem>
            );
        }
  };

  return (
    <>
      <Button
        {...bindHover(popupState)}
        {...bindFocus(popupState)}
        className={classes.btnNav} 
        style={{color:textColor, fontWeight:textBold, fontSize:textSize}}
        component={Link} to={`${url}/products/all`}
      >
        Sản phẩm
      </Button>
      <CascadingMenu
        popupState={popupState}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}  
      >
        
        {category.map((nodes)=> renderTree(nodes))}

      </CascadingMenu>
    </>
  )
}

export default HoverMenuBtn

// const category =[
//     {
//         id:1,
//         title:"Quần áo",
//         children:[
//             {
//                 id:6,
//                 title:"Quần",
//                 children:[
//                     {title:"Quần dài"},
//                     {title:"Quần đùi"},
//                 ]
//             },
//             {
//                 id:7,
//                 title:"Áo",
//                 children:[
//                     {title:"Áo dài"},
//                     {title:"Áo thun"},
//                 ]
            
//             },
//             {id:8,title:"Đầm"},
//             {id:9,title:"Váy"},

//         ]
//     },
//     {
//         id:2,
//         title:"Phụ kiện",
//         children:[
//             {id:10,title:"Nón"},
//             {id:11,title:"Mắt kiếng"},
//         ]
//     },
//     {id:3,title:"Túi xách"},
//     {id:4,title:"Giày dép"},
//     {id:5,title:"Quần"}

// ]


