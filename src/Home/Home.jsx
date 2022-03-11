import React from "react";
import Product from "../Components/Product/Product";
import Search from "../Components/Search";
import SneakersContext from "../Context";

class Home extends React.Component {
    state = {
        searchValue: ''
    }
    static contextType = SneakersContext
    searchHandler = event => {
        let searchValue = {...this.state.searchValue};
        searchValue = event.target.value;
        this.setState({searchValue})
        this.renderProducts()
    }
    renderProducts = () => {
        const filtredItems = Object.keys(this.context.sneakers).filter(key => this.context.sneakers[key].title.toLowerCase().includes(this.state.searchValue.toLocaleLowerCase()))
        return (this.props.isLoading ? [...Array(12)] : filtredItems).map(key => <Product key={key}
                                                                                          isLoading={this.props.isLoading}
                                                                                          index={key}  {...this.context.sneakers[key]} />)
    }

    render() {
        return <div>
            <div className="content">
                <div className="d-flex justify-between align-center">
                    <Search onChange={this.searchHandler}/>
                </div>
                <div className="sneakers">
                    {this.renderProducts()}
                </div>
            </div>
        </div>
    }
}

export default Home;