import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import config from '@config/index';
import { Link } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { selectBookList } from './selectors';
import { getBook } from './actions';
import classes from './style.module.scss';

const Book = ({ books }) => {
  const dispatch = useDispatch();
  const [openElem, setOpenElem] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (elem) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpenElem(elem);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenElem(null);
  };

  useEffect(() => {
    dispatch(getBook());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2>
          <FormattedMessage id="book" />
        </h2>
        <Link to="/admin/register-book">
          <Button variant="contained" color="primary">
            <FormattedMessage id="registerBook" />
          </Button>
        </Link>
      </div>

      <div className={classes['card-container']}>
        {books.length === 0 ? (
          <h4>
            <FormattedMessage id="emptyBook" />
          </h4>
        ) : (
          books.map((item) => (
            <div key={item.id} className={classes.card}>
              <div className={classes.title}>
                {item.title.split(' ').length <= 4 ? (
                  <h5>{item.title}</h5>
                ) : (
                  <h5> {item.title.split(' ').slice(0, 4).join(' ')} </h5>
                )}
              </div>
              <div className={classes['image-container']}>
                <img src={`${config.api.image_book}${item.image}`} alt="" className={classes.image} />
              </div>
              <div className={classes.desc}>
                <div className={classes.author}>
                  {item.author.split(' ').length <= 2 ? (
                    <p>{item.author}</p>
                  ) : (
                    <p> {item.author.split(' ').slice(0, 1).join(' ')}...</p>
                  )}
                </div>
                <div className={classes.info}>
                  <h3>{item.Categories?.name}</h3>
                  <p>{item.publishAt}</p>
                </div>
              </div>
              <div className={classes.drop}>
                <div>
                  <div className={classes.toolbar}>
                    <div className={classes.toggle} onClick={handleClick(item.id)}>
                      <MoreHorizIcon />
                    </div>
                  </div>
                  <Menu open={openElem === item.id} anchorEl={anchorEl} onClose={handleClose} elevation={1}>
                    <Link to={`/admin/edit-book/${item.id}`} onClose={handleClose}>
                      <MenuItem sx={{ fontSize: 12, height: 10, marginBottom: 1 }}>
                        <div className={classes.menu}>
                          <div className={classes.menuLang}>
                            <FormattedMessage id="editBook" />
                          </div>
                        </div>
                      </MenuItem>
                    </Link>

                    <Link to={`/admin/edit-book/${item.id}`} onClose={handleClose}>
                      <MenuItem sx={{ fontSize: 12, height: 10 }}>
                        <div className={classes.menu}>
                          <div className={classes.menuLang}>
                            <FormattedMessage id="delete" />
                          </div>
                        </div>
                      </MenuItem>
                    </Link>
                  </Menu>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

Book.propTypes = {
  books: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  books: selectBookList,
});

export default connect(mapStateToProps)(Book);
