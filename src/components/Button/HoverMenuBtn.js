import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
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

const useCascadingMenuStyles = makeStyles((theme) => ({
  submenu: {
    marginTop: theme.spacing(-1),
  },
  title: {
    flexGrow: 1,
    color:grey[700],
    width:150
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
  const { rootPopupState } = React.useContext(CascadingContext)
  if (!rootPopupState) throw new Error('must be used inside a CascadingMenu')
  const handleClick = React.useCallback(
    (event) => {
      rootPopupState.close(event)
    //   if (onClick) onClick(event)
        props.handleClickItem(title)
    },
    [rootPopupState, onClick]
  )

  return <MenuItem {...props} onClick={handleClick} className={classes.title}  />
}

function CascadingSubmenu({ onClick,title,id, popupId, ...props }) {
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
    //   if (onClick) onClick(event)
    // if(onClick)
        props.handleClickItem(title)
    },
    [rootPopupState, onClick]
  )

  return (
    <React.Fragment>
      <MenuItem {...bindHover(popupState)} {...bindFocus(popupState)} className={classes.title} onClick={handleClick} >
        <span className={classes.title}>{title}</span>
        <ChevronRight className={classes.moreArrow} />
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
    <CascadingContext.Provider value={context}>
      <HoverMenu {...props} {...bindMenu(popupState)} />
    </CascadingContext.Provider>
  )
}
const HoverMenuBtn = (props) => {
  const {handleClickItem} = props;
  const classes = useCascadingMenuStyles();
  const popupState = usePopupState({
    popupId: 'demoMenu',
    variant: 'popover',
  })
  const renderTree = (nodes) => {
        if(nodes.children){
           return(
            <CascadingSubmenu 
            popupId={nodes.title} 
            id={nodes.id}
            title={nodes.title} 
            handleClickItem={handleClickItem}
         >
           {
            Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : 
                <CascadingMenuItem 
                id={nodes.id}
                title={nodes.title} 
                handleClickItem={handleClickItem}
                >
                    {nodes.title}
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
      >
        Menu
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

const category =[
    {
        id:1,
        title:"Quần áo",
        children:[
            {
                id:6,
                title:"Quần",
                children:[
                    {title:"Quần dài"},
                    {title:"Quần đùi"},
                ]
            },
            {
                id:7,
                title:"Áo",
                children:[
                    {title:"Áo dài"},
                    {title:"Áo thun"},
                ]
            
            },
            {id:8,title:"Đầm"},
            {id:9,title:"Váy"},

        ]
    },
    {
        id:2,
        title:"Phụ kiện",
        children:[
            {id:10,title:"Nón"},
            {id:11,title:"Mắt kiếng"},
        ]
    },
    {id:3,title:"Túi xách"},
    {id:4,title:"Giày dép"},
    {id:5,title:"Quần"}

]



