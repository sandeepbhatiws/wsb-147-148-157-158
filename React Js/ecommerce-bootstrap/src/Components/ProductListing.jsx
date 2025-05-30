import React, { useEffect, useState } from 'react'
import Header from './Coomon/Header'
import Breadcrum from './Coomon/Breadcrum'
import Footer from './Coomon/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'
import ProductCard from './ProductCard'
import { IoSearch } from "react-icons/io5";
import Pagination from 'react-bootstrap/Pagination';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';
import { useParams } from 'react-router-dom'

export default function ProductListing() {

    const params = useParams();

    const [filterAllCategories, setFilterAllCategories] = useState([]);

    useEffect(() => {
        if(params.slug){
            setFilterAllCategories([params.slug]);
        }
    },[params.slug]);
    
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    var [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [sorting, setSorting] = useState('');
    
    const [productName, setProductName] = useState('');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [totalPages, setTotalPages] = useState('');
    const [allPages, setAllPages] = useState([]);


    useEffect(() => {
        var api = 'https://wscubetech.co/ecommerce-api/categories.php';

        axios.get(api)
            .then((result) => {
                setCategories(result.data.data);
            })
            .catch(() => {
                toast.error('Something went wrong');
            });
    }, []);

    useEffect(() => {
        var api = 'https://wscubetech.co/ecommerce-api/brands.php';

        axios.get(api)
            .then((result) => {
                setBrands(result.data.data);
            })
            .catch(() => {
                toast.error('Something went wrong');
            });
    }, []);

    //First Method
    // useEffect(() => {
    //     axios.get(`https://wscubetech.co/ecommerce-api/products.php?limit=18&page=${currentPage}`)
    //     .then((result) => {
    //         setProducts(result.data.data)
    //     })
    //     .catch(() => {
    //         toast.error('Something went wrong!');
    //     })
    // },[currentPage]);

    useEffect(() => {

        axios.get(`https://wscubetech.co/ecommerce-api/products.php`, {
            params: {
                page: currentPage,
                limit: 15,
                sorting: sorting,
                name: productName,
                price_from: priceFrom,
                price_to: priceTo,
                discount_from: '',
                discount_to: '',
                rating: '',
                brands: '',
                categories: filterAllCategories.toString()
            }
        })
            .then((result) => {
                setProducts(result.data.data)
                setTotalRecords(result.data.total_records)
                setTotalPages(result.data.total_pages)
            })
            .catch(() => {
                toast.error('Something went wrong!');
            })
    }, [params.slug, currentPage, sorting, filterAllCategories, priceFrom, priceTo, productName]);


    useEffect(() => {

        var allPages = [];
        for (let i = 1; i <= totalPages; i++) {
            allPages.push(i);
        }
        setAllPages(allPages);
        console.log(allPages);

    }, [])



    const firstPage = () => {
        setCurrentPage(1)
    }

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage--);
        }
    }

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage++);
        }
    }

    const lastPage = () => {
        setCurrentPage(totalPages);
    }

    const filterProducts = (event) => {
        console.log(event.target.value)
        setSorting(event.target.value)
    }

    const filterCategoryData = (slug) => {
        setCurrentPage(1)

        if (filterAllCategories.includes(slug)) {

            var data = filterAllCategories.filter((v) => {
                if (slug != v) {
                    return v;
                }
            })

            var data = [...data];
            setFilterAllCategories(data);
            console.log(data);

        } else {
            const data = [...filterAllCategories, slug];
            setFilterAllCategories(data);
            console.log(data);
        }
    }

    const clearAll = () => {
        setFilterAllCategories([]);
        setPriceFrom('');
        setPriceTo('');
    }

    const filterPrice = (event) => {
        setPriceTo(event.target.value);
    }

    const filterPriceFrom = (event) => {
        setPriceFrom(event.target.value);
    }

    const filterPriceTo = (event) => {
        setPriceTo(event.target.value);
    }

    const filterProductName = (event) => {
        setProductName(event.target.value);
    }


    return (
        <>
            <Breadcrum />

            <div class="container py-5">
                <div class="row">
                    {/* <!-- Filter Button (Mobile) --> */}
                    <div class="col-12 d-lg-none mb-3">
                        <button class="btn btn-outline-secondary w-100 d-flex justify-content-center align-items-center gap-2"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#filterSidebar">
                            <i class="fa fa-filter"></i> Filter Products
                        </button>
                    </div>

                    {/* <!-- Sidebar Filters --> */}
                    <div class="col-lg-3">
                        {/* <!-- Desktop Filters --> */}
                        <div class="card shadow-sm d-none d-lg-block">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <h5 class="card-title mb-0">Filters</h5>
                                    <button onClick={clearAll} class="btn btn-sm btn-link text-decoration-none p-0">Clear All</button>
                                </div>

                                {/* <!-- Categories Filter --> */}
                                <div class="mb-4 section-filter">
                                    <h6 class="fw-bold mb-3">Categories</h6>

                                    {
                                        categories.map((v, i) => {
                                            return (
                                                <FilterCategories key={i} data={v} filterCategory={filterCategoryData} filterAllCategories={filterAllCategories} />
                                            )
                                        })
                                    }
                                </div>

                                {/* <!-- Brands Filter --> */}
                                <div class="mb-4 section-filter">
                                    <h6 class="fw-bold mb-3">Brands</h6>
                                    {
                                        brands.map((v, i) => {
                                            return (
                                                <FilterBrands key={i} data={v} />
                                            )
                                        })
                                    }
                                </div>

                                {/* <!-- Price Range Filter --> */}
                                <div class="mb-3">
                                    <h6 class="fw-bold mb-3">Price Range</h6>
                                    <div class="d-flex justify-content-between mb-2">
                                        <span>$0</span>
                                        <span>
                                            {
                                                (priceTo != '')
                                                    ?
                                                    priceTo
                                                    :
                                                    '1500'
                                            }
                                        </span>
                                    </div>
                                    <input type="range" class="form-range" min="0" max="1500" step="10" id="priceRange" onChange={filterPrice} />
                                    <div class="row g-2 mt-2">
                                        <div class="col-6">
                                            <div class="input-group input-group-sm">
                                                <span class="input-group-text">$</span>
                                                <input type="number" class="form-control" onKeyUp={filterPriceFrom} placeholder="Min" min="0" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="input-group input-group-sm">
                                                <span class="input-group-text">$</span>
                                                <input type="number" class="form-control"
                                                    onKeyUp={filterPriceTo} placeholder="Max" min="0" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Mobile Filters (Offcanvas) --> */}
                        <div class="offcanvas offcanvas-start" tabindex="-1" id="filterSidebar">
                            <div class="offcanvas-header">
                                <h5 class="offcanvas-title">Filters</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div class="offcanvas-body">
                                {/* <!-- Categories Filter --> */}
                                <div class="mb-4 section-filter">
                                    <h6 class="fw-bold mb-3">Categories</h6>
                                    {
                                        categories.map((v, i) => {
                                            return (
                                                <FilterCategories key={i} data={v} filterCategory={filterCategoryData} filterAllCategories={filterAllCategories} />
                                            )
                                        })
                                    }
                                </div>

                                {/* <!-- Brands Filter --> */}
                                <div class="mb-4 section-filter">
                                    <h6 class="fw-bold mb-3">Brands</h6>
                                    {
                                        brands.map((v, i) => {
                                            return (
                                                <FilterBrands key={i} data={v} />
                                            )
                                        })
                                    }
                                </div>

                                {/* <!-- Price Range Filter --> */}
                                <div class="mb-4">
                                    <h6 class="fw-bold mb-3">Price Range</h6>
                                    <div class="d-flex justify-content-between mb-2">
                                        <span>$0</span>
                                        <span>$1500</span>
                                    </div>
                                    <input type="range" class="form-range" min="0" max="1500" step="10" id="mobilePriceRange" onChange={filterPrice} />
                                    <div class="row g-2 mt-2">
                                        <div class="col-6">
                                            <div class="input-group input-group-sm">
                                                <span class="input-group-text">$</span>
                                                <input type="number" class="form-control" placeholder="Min" min="0" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="input-group input-group-sm">
                                                <span class="input-group-text">$</span>
                                                <input type="number" class="form-control" placeholder="Max" min="0" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button class="btn btn-primary w-100">Apply Filters</button>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Main Product Content --> */}
                    <div class="col-lg-9">
                        {/* <!-- Top bar with results count and sorting --> */}
                        <div class="card shadow-sm mb-4">
                            <div class="card-body">

                                <div class="col-md-5 col-12 order-md-1 order-3 mt-2 mt-md-0">
                                    <div class="input-group">
                                        <span class="input-group-text bg-white border-end-0">
                                            <IoSearch />
                                        </span>
                                        <input type="text" onKeyUp={filterProductName} class="form-control border-start-0" placeholder="Search products..." />
                                    </div>
                                </div>

                                <div class="row align-items-center">
                                    <div class="col-md-6 mb-2 mb-md-0">
                                        <h6 class="mb-0">{totalRecords} Products</h6>
                                        <small class="text-muted">Filtered results</small>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="d-flex align-items-center justify-content-md-end">
                                            <i class="fa fa-sort text-muted me-2"></i>
                                            <span class="text-nowrap me-2 d-none d-sm-inline">Sort by:</span>
                                            <select class="form-select form-select-sm w-auto" onChange={filterProducts}>
                                                <option value="">Sort By -</option>
                                                <option value="1">Name : A to Z</option>
                                                <option value="2">Name : Z to A</option>
                                                <option value="3">Price: Low to High</option>
                                                <option value="4">Price: High to Low</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Product Grid --> */}

                        {
                            products.length > 0

                                ?
                                <>
                                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4">
                                        {/* <!-- Product 1 --> */}

                                        {
                                            products.map((v, i) => {
                                                return (
                                                    <ProductCard key={i} data={v} />
                                                )
                                            })
                                        }


                                    </div>

                                    <div className='row'>
                                        <Pagination>
                                            <Pagination.First onClick={firstPage} />
                                            <Pagination.Prev onClick={previousPage} />
                                            {allPages.map((v, i) => {
                                                return (
                                                    <Pagination.Item key={i}>{v}</Pagination.Item>
                                                )
                                            })}
                                            <Pagination.Next onClick={nextPage} />
                                            <Pagination.Last onClick={lastPage} />
                                        </Pagination>


                                        <ResponsivePagination
                                            current={currentPage}
                                            total={totalPages}
                                            onPageChange={setCurrentPage}
                                        />
                                    </div>
                                </>
                                :

                                'No Record founds'
                        }


                    </div>
                </div>
            </div>
        </>
    )
}


function FilterCategories({ data, filterCategory, filterAllCategories }) {
    return (
        <div class="form-check mb-2">
            <input class="form-check-input" onClick={() => filterCategory(data.slug)} type="checkbox" checked={filterAllCategories.includes(data.slug) ? 'checked' : ''} id={data.slug} />
            <label class="form-check-label" for={data.slug}>{data.name}</label>
        </div>
    )
}

function FilterBrands({ data }) {
    return (
        <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id={data.slug} />
            <label class="form-check-label" for={data.slug}>{data.name}</label>
        </div>
    )
}