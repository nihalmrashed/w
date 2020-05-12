import sys, json, numpy as np, pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import ExtraTreesRegressor

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def main():
    #get our data as an array from read_in()
    lines = read_in()
    #create a numpy array
    np_lines = np.array(lines)
    data = pd.read_csv("C:\\Users\\\MATRA\\Desktop\\dataset.csv")
    x = data.drop(['order id', 'order preparation time',  'order start date', 'order finish date'  ], axis = 1)
    y = data['order preparation time']
    x_train, x_test, y_train, y_test = train_test_split( x.values, y.values, test_size=0.3, random_state=42 )
    reg = ExtraTreesRegressor(n_estimators = 10)
    reg.fit(x_train, y_train)
    ynew = reg.predict(lines)
    print(ynew[0]*100)
sys.stdout.flush()

#start process
if __name__ == '__main__':
    main()