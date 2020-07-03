import React from 'react'
import FilterIcon from '@material-ui/icons/FilterList'
import CloseIcon from '@material-ui/icons/Close'
import { Toolbar, InputBase, InputAdornment, makeStyles, createStyles, IconButton, Theme, fade } from '@material-ui/core'

export type FilterToolbarProps = {
    filterParam: string
    onFilter(filterParam : string): void
}

export function FilterToolbar({ filterParam, onFilter } : FilterToolbarProps) {

    const classes = useStyles()

    return (
        <Toolbar>
            <div className={classes.filter}>
                <div className={classes.filterIcon}>
                    <FilterIcon />
                </div>
                <InputBase
                    placeholder='Filter...'
                    classes={{ root: classes.inputRoot, input: classes.inputInput }}
                    value={filterParam}
                    onChange={event => onFilter(event.target.value)}
                    endAdornment={
                        filterParam && filterParam.length &&
                        <InputAdornment position='end' className={classes.endAdornment}>
                            <IconButton
                                onClick={() => onFilter('')}
                                onMouseDown={() => onFilter('')}
                                edge='end'
                            >
                                <CloseIcon className={classes.endAdornmentIcon} color='primary' />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </div>
        </Toolbar>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        filter: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.25),
            marginLeft: 0,
            width: '100%',
        },
        filterIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
            width: '100%'
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            width: '100%',
        },
        endAdornment: {
            padding: theme.spacing(2, 2, 2, 2)
        },
        endAdornmentIcon: {
            color: 'white'
        }
    }),
)