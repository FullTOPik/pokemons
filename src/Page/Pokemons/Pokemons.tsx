import { FC, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import Alert from '../../components/Alert/Alert';
import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { fetchPokemons } from '../../store/pokemons/actionCreators';
import {
  Chip,
  Container,
  TableFooter,
  TablePagination,
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { findColor, findVariant } from '../../helper';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import MultipleSelectChip from '../../components/SelectType';
import TablePaginationActions from '../../components/Pagination/Pagination';
import qs from 'qs';

interface IQuery {
  rowsPerPage: string;
  currentPage: string;
  typePokemon: string[];
}

interface ISearchOption {
  page: number;
  rowsPerPage: number;
}

const tableCells = [
  { title: 'Name', key: 1 },
  { title: 'Image', key: 2 },
  { title: 'Types', key: 3 },
  { title: 'Height', key: 4 },
  { title: 'Weight', key: 5 },
];

const initialSearchOption = {
  page: 0,
  rowsPerPage: 10,
};

const Pokemons: FC = () => {
  const dispatch = useTypedDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const { count, pokemons, loading } = useTypedSelector(
    state => state.pokemons.pokemons,
  );
  const [searchOption, setSearchOption] =
    useState<ISearchOption>(initialSearchOption);
  const [personName, setPersonName] = useState<string[]>([]);
  console.log('searchParams', searchParams);
  useLayoutEffect(() => {
    if (location) {
      const params = qs.parse(
        location.search.substring(1),
      ) as unknown as IQuery;

      if (params.rowsPerPage) {
        setSearchOption(prev => ({
          ...prev,
          rowsPerPage: Number(params.rowsPerPage),
        }));
      }

      if (params.currentPage) {
        setSearchOption(prev => ({
          ...prev,
          page: Number(params.currentPage),
        }));
      }

      if (params.typePokemon) {
        setPersonName(params.typePokemon);
      }
    }
  }, [location]);

  useEffect(() => {
    if (searchOption) {
      dispatch(fetchPokemons({ ...searchOption }));
    }
  }, [searchOption, dispatch]);

  useEffect(() => {
    if (!searchParams) {
      const queryString = qs.stringify({
        currentPage: searchOption.page,
        rowsPerPage: searchOption.rowsPerPage,
        typePokemon: personName,
      });
      setSearchParams(queryString);
    }
  }, [searchOption, personName]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
  ) => {
    setSearchOption({ ...searchOption, page: newPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) =>
    setSearchOption({
      ...searchOption,
      page: 0,
      rowsPerPage: Number(event.target.value),
    });

  const filterByTag = useMemo(() => {
    if (personName.length === 0) {
      return pokemons;
    }

    if (pokemons) {
      return pokemons!.filter(pokemon =>
        pokemon.types
          .map(type => personName.includes(type.type.name))
          .some(type => Boolean(type)),
      );
    }

    return [];
  }, [personName, pokemons]);

  return (
    <>
      <TableContainer sx={{ mt: 8 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <MultipleSelectChip
              setPersonName={setPersonName}
              personName={personName}
            />

            <TableRow>
              {tableCells.map((cell, index) => (
                <TableCell
                  align={index > 0 ? 'center' : undefined}
                  key={cell.key}
                >
                  {cell.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {!loading && filterByTag && filterByTag.length > 0 ? (
            <TableBody>
              {filterByTag!.map(pokemon => (
                <TableRow
                  key={pokemon.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="col">
                    <Link to={`/pokemons/${pokemon.id}`}>
                      {pokemon.name.charAt(0).toUpperCase() +
                        pokemon.name.slice(1)}
                    </Link>
                  </TableCell>

                  <TableCell component="th" scope="col">
                    <Link to={`/pokemons/${pokemon.id}`}>
                      <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                      />
                    </Link>
                  </TableCell>

                  <TableCell component="th" scope="col">
                    {pokemon.types.map((typesPokemon, index) => (
                      <Container
                        sx={{
                          padding: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        key={index}
                      >
                        <Chip
                          sx={{ mt: 1 }}
                          label={typesPokemon.type.name}
                          color={findColor(typesPokemon.type.name)}
                          variant={findVariant(typesPokemon.type.name)}
                        />
                      </Container>
                    ))}
                  </TableCell>

                  <TableCell component="th" scope="col">
                    <Container
                      sx={{
                        display: 'flex',
                        height: '100%',
                        justifyContent: 'center',
                      }}
                    >
                      {`${pokemon.height * 10} sm`}
                    </Container>
                  </TableCell>

                  <TableCell component="th" scope="col">
                    <Container
                      sx={{
                        display: 'flex',
                        height: '100%',
                        justifyContent: 'center',
                      }}
                    >
                      {`${pokemon.weight} kg`}
                    </Container>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <Backdrop
              sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
              open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                count={count!}
                ActionsComponent={TablePaginationActions}
                page={searchOption.page}
                rowsPerPage={searchOption.rowsPerPage}
                color="secondary"
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Alert message="error" />
    </>
  );
};

export default Pokemons;
