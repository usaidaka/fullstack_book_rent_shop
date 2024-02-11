import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import config from '@config/index';
import { Link } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import toast, { Toaster } from 'react-hot-toast';

/* MODAL */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { selectBookList } from './selectors';
import { deleteBook, getBook } from './actions';
import classes from './style.module.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

  const handleDelete = async (id) => {
    dispatch(
      deleteBook(id, (message) => {
        toast.success(message, { duration: 2000 });
        dispatch(getBook());
      })
    );
  };

  useEffect(() => {
    dispatch(getBook());
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return (
    <div data-testid="book-container" className={classes.container}>
      <div data-testid="book-header" className={classes.header}>
        <h2>
          <FormattedMessage id="book" />
        </h2>
        <Link to="/admin/register-book">
          <Button variant="contained" color="primary">
            <FormattedMessage id="registerBook" />
          </Button>
        </Link>
      </div>
      <div data-testid="book-card-container" className={classes['card-container']}>
        {books.length === 0 ? (
          <h4>
            <FormattedMessage id="emptyBook" />
          </h4>
        ) : (
          books.map((item) => (
            <div key={item.id} data-testid="book-card" className={classes.card}>
              <div data-testid="book-title" className={classes.title}>
                {item.title.split(' ').length <= 4 ? (
                  <h5>{item.title}</h5>
                ) : (
                  <h5> {item.title.split(' ').slice(0, 4).join(' ')} </h5>
                )}
              </div>
              <div data-testid="book-imaage-container" className={classes['image-container']}>
                <img
                  src={`${config.api.image_book}${item.image}`}
                  alt=""
                  data-testid="book-image"
                  className={classes.image}
                />
              </div>
              <div data-testid="book-desc" className={classes.desc}>
                <div data-testid="book-author" className={classes.author}>
                  {item.author.split(' ').length <= 2 ? (
                    <p>{item.author}</p>
                  ) : (
                    <p> {item.author.split(' ').slice(0, 1).join(' ')}...</p>
                  )}
                </div>
                <div data-testid="book-info" className={classes.info}>
                  <h3>{item.Categories?.name}</h3>
                  <p>{item.publishAt}</p>
                </div>
              </div>
              <div data-testid="book-drop" className={classes.drop}>
                <div>
                  <div data-testid="book-toolbar" className={classes.toolbar}>
                    <div data-testid="book-toggle" className={classes.toggle} onClick={handleClick(item.id)}>
                      <MoreHorizIcon />
                    </div>
                  </div>
                  <Menu open={openElem === item.id} anchorEl={anchorEl} onClose={handleClose} elevation={1}>
                    <Link to={`/admin/edit-book/${item.id}`} onClose={handleClose}>
                      <MenuItem sx={{ fontSize: 12, height: 10, marginBottom: 1 }}>
                        <div data-testid="book-menu" className={classes.menu}>
                          <div data-testid="book-menuLang" className={classes.menuLang}>
                            <FormattedMessage id="editBook" />
                          </div>
                        </div>
                      </MenuItem>
                    </Link>

                    <MenuItem sx={{ fontSize: 12, height: 10 }}>
                      <div className={classes.menu} onClick={handleOpenModal}>
                        <div className={classes.menuLang}>
                          <FormattedMessage id="delete" />
                        </div>
                      </div>
                      <Modal
                        open={open}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                            <FormattedMessage id="deleteBookConfirmation" />
                          </Typography>
                          <div className={classes.confirmation}>
                            <Button
                              variant="outlined"
                              onClick={() => {
                                handleDelete(item.id);
                                handleCloseModal();
                                handleClose();
                              }}
                            >
                              <FormattedMessage id="positiveConfirmation" />
                            </Button>
                            <Button variant="contained" color="error" onClick={handleCloseModal}>
                              <FormattedMessage id="negativeConfirmation" />
                            </Button>
                          </div>
                        </Box>
                      </Modal>
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
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
